using crmsvcutil_ts.LoginWindow;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Linq;
using System.Windows;
using System.CodeDom;
using Microsoft.Xrm.Sdk.Metadata;
using System.CodeDom.Compiler;
using System.IO;
using Fonlow.TypeScriptCodeDom;
using Xrm2Ts;
using System.Collections.Generic;

namespace crmsvcutil_ts
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public CrmLogin ctrl;
        public IOrganizationService _service;

        /// <summary>
        /// Button to login to CRM and create a CrmService Client 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            #region Login Control
            // Establish the Login control
            ctrl = new CrmLogin();
            // Wire Event to login response. 
            ctrl.ConnectionToCrmCompleted += ctrl_ConnectionToCrmCompleted;
            // Show the dialog. 
            ctrl.ShowDialog();
            // Handel return. 
            //if (ctrl.CrmConnectionMgr != null && ctrl.CrmConnectionMgr.CrmSvc != null && ctrl.CrmConnectionMgr.CrmSvc.IsReady)
            //    MessageBox.Show("Good Connect");
            //else
            //    MessageBox.Show("BadConnect");

            #endregion

            #region CRMServiceClient
            if (ctrl.CrmConnectionMgr != null && ctrl.CrmConnectionMgr.CrmSvc != null && ctrl.CrmConnectionMgr.CrmSvc.IsReady)
            {
                CrmServiceClient svcClient = ctrl.CrmConnectionMgr.CrmSvc;
                if (svcClient.IsReady)
                {
                    // globally set the orgservice to be used elsewhere in the app
                    _service = svcClient.OrganizationServiceProxy;

                    // retrieve all entities (just entity metadata)
                    var req = new RetrieveAllEntitiesRequest()
                    {
                        EntityFilters = EntityFilters.Entity,
                        RetrieveAsIfPublished = false
                    };
                    var resp = (RetrieveAllEntitiesResponse)svcClient.ExecuteCrmOrganizationRequest(req);

                    // set the itemsource of the itembox equal to entity metadata that is customizable (takes out systemjobs and stuff like that)
                    listBox.ItemsSource = resp.EntityMetadata.Where(x => x.IsCustomizable.Value == true);

                    // specify that the schemaname shows in the listbox
                    listBox.DisplayMemberPath = "SchemaName";

                    // sort by schemaname
                    listBox.Items.SortDescriptions.Add(
                        new System.ComponentModel.SortDescription("SchemaName",
                           System.ComponentModel.ListSortDirection.Ascending));

                    // toggle visibility once the lisbox is populated (maybe async would be better here?)
                    listBox.Visibility = Visibility.Visible;
                    button.Visibility = Visibility.Visible;
                    label1.Visibility = Visibility.Visible;
                }
            }
            #endregion


        }

        /// <summary>
        /// Raised when the login form process is completed.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ctrl_ConnectionToCrmCompleted(object sender, EventArgs e)
        {
            if (sender is CrmLogin)
            {
                this.Dispatcher.Invoke(() =>
                {
                    ((CrmLogin)sender).Close();
                });
            }
        }

        /// <summary>
        /// When generate is clicked we go through the process necessary to create a CS file representative of the chosen
        /// entities metadata
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button_Click(object sender, RoutedEventArgs e)
        {
            // collect all of the entity metadata items with the attribubte metadata
            var selectedEntityMetadata= new List<EntityMetadata>();

            // CodeDOM starter objects
            var targetUnit = new CodeCompileUnit();
            CodeNamespace Xrm = new CodeNamespace("Xrm");

            //foreach selected entity in the listbox
            foreach (EntityMetadata i in listBox.SelectedItems)
            {
                // Retrieve the attribute metadata
                var req = new RetrieveEntityRequest() {
                    LogicalName = i.LogicalName,
                    EntityFilters = EntityFilters.Attributes,
                    RetrieveAsIfPublished = false
                };
                var resp = (RetrieveEntityResponse)_service.Execute(req);

                // add to the list!
                selectedEntityMetadata.Add(resp.EntityMetadata);

                // create a class that represents the entity
                var targetClass = new CodeTypeDeclaration(i.SchemaName);
                targetClass.IsClass = true;

                // for each attribute of the entity
                foreach (var a in resp.EntityMetadata.Attributes)
                {
                    // create a new property named after the attribute's logical name
                    var prop = new CodeMemberField();
                    prop.Attributes = MemberAttributes.Public;
                    prop.Name = a.LogicalName;

                    // assign a type based on attributetypecode
                    if (a.AttributeType == AttributeTypeCode.Virtual ||
                        a.AttributeType == AttributeTypeCode.State ||
                        a.AttributeType == AttributeTypeCode.Integer ||
                        a.AttributeType == AttributeTypeCode.BigInt) prop.Type = new CodeTypeReference(typeof(int));
                    else if (a.AttributeType == AttributeTypeCode.Money ||
                        a.AttributeType == AttributeTypeCode.Decimal ||
                        a.AttributeType == AttributeTypeCode.Double) prop.Type = new CodeTypeReference(typeof(decimal));
                    else
                        prop.Type = new CodeTypeReference(typeof(string));

                    // add the property to the entity class
                    targetClass.Members.Add(prop);
                }

                // add a route constant for the entity class.  This is used as a helper for the angular WebAPI functionality
                var cmf = new CodeMemberField(typeof(string), "route");
                cmf.Attributes = MemberAttributes.Const | MemberAttributes.Public;
                cmf.InitExpression = new CodePrimitiveExpression(i.LogicalCollectionName);
                targetClass.Members.Add(cmf);

                // add the class to the Xrm namespace
                Xrm.Types.Add(targetClass);
                
            }

            // TODO jim testing
            var xrm2tsAll = new XrmToTypeScriptTemplate(selectedEntityMetadata);
            textResults.Text = xrm2tsAll.RenderAllClassTemplates();

            // once all the classes and properties have been added we add the namespace to the codecompileunit
            targetUnit.Namespaces.Add(Xrm);

            // delete the file if it exists
            if (File.Exists(Environment.CurrentDirectory + @"\Xrm.cs"))
                File.Delete(Environment.CurrentDirectory + @"\Xrm.cs");

            // create the c# file
            CodeDomProvider provider = CodeDomProvider.CreateProvider("CSharp");
            CodeGeneratorOptions options = new CodeGeneratorOptions();
            options.BracingStyle = "C";

            using (StreamWriter sourceWriter = new StreamWriter("Xrm.cs"))
            {
                provider.GenerateCodeFromCompileUnit(
                    targetUnit, sourceWriter, options);
            }

            // adds the item to the project so typewriter auto-generates
            // you may need to change from 14 to another number if your version of visual studio
            // is not 2015
            //EnvDTE80.DTE2 dte2;
            //dte2 = (EnvDTE80.DTE2)System.Runtime.InteropServices.Marshal.
            //GetActiveObject("VisualStudio.DTE.14.0");
            //var proj = dte2.Solution.Projects.Item(1);
            //var item = proj.ProjectItems.AddFromFile(Environment.CurrentDirectory + @"\Xrm.cs");

            // show the "Generated" label in the app
            label.Visibility = Visibility.Visible;
        }
    }
}
