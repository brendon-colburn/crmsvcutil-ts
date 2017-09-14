using System.Text;
using System.Collections.Generic;

using Microsoft.Xrm.Sdk.Metadata;

namespace Xrm2Ts
{
    public class XrmToTypeScriptTemplate
    {
        private List<EntityMetadata> _entityMeta = null;
        private StringBuilder _builderOutput = new StringBuilder();

        public XrmToTypeScriptTemplate(List<EntityMetadata> entityMeta) {
            _entityMeta = entityMeta;
        }

        /// <summary>
        /// Render all of the classes in the provided list of EntityMetadata objects
        /// </summary>
        /// <returns></returns>
        public string RenderAllClassTemplates() {

            foreach (var entity in _entityMeta) {
                var classRender = new XrmToTypeScriptClass(entity, _builderOutput);
                classRender.RenderClassTemplate();
            }

            var templateText = getXrmTSTemplate();
            templateText = templateText.Replace("{#rendered_content#}", _builderOutput.ToString());

            return templateText;
        }

        /// <summary>
        /// Grab the Xrm.ts template from the resource 
        /// </summary>
        /// <returns></returns>
        private string getXrmTSTemplate() {
            string result = crmsvcutil_ts.Properties.Resources.Xrm_ts;
            return result;
        }
    }
    public class XrmToTypeScriptClass
    {
        private EntityMetadata _entityMeta = null;
        private StringBuilder _sb = null;
        private string _formattedName = null;
        public XrmToTypeScriptClass(EntityMetadata entityMeta) {
            _entityMeta = entityMeta;
            _sb = new StringBuilder();
        }
        public XrmToTypeScriptClass(EntityMetadata entityMeta, StringBuilder appendTo) : this(entityMeta) {
            _sb = appendTo;
        }

        /// <summary>
        /// Render the entire class
        /// </summary>
        /// <returns></returns>
        public StringBuilder RenderClassTemplate()
        {
            // used a bunch of times, just set it once 
            _formattedName = firstUpper(_entityMeta.LogicalName);

            _sb.AppendLine(string.Format("//** @description AUTO GENERATED CLASSES FOR {0}", _formattedName));

            RenderInterface();
            RenderAttributes();
            RenderEntityClass();
            return _sb;
        }

        /// <summary>
        /// Render the class interface definitions
        /// </summary>
        private void RenderInterface()
        {
            var entityName = firstUpper(_entityMeta.LogicalName);

            _sb.AppendLine(string.Format("//** @description WebAPI collection interface for {0} */", entityName))
                .AppendLine(string.Format("export interface I{0}s extends IRetrieveMultipleData<I{1}> {{}}", entityName, entityName))

                .AppendLine(string.Format("//** @description WebAPI interface for {0} */", entityName))
                .AppendLine(string.Format("export interface I{0} {{", entityName))
                .AppendLine("\t[key: string]: string | number");

            foreach (var attr in _entityMeta.Attributes) {
                _sb.AppendLine(string.Format("\t{0}?: {1}", lookupFixer(attr), getDataType(attr)));
            }

            // close out the class
            _sb.AppendLine("}");
        }

        /// <summary>
        /// Render each of the attributes in list with the schema name and the webapi escaped name for lookups
        /// </summary>
        private void RenderAttributes()
        {
            var entityName = firstUpper(_entityMeta.LogicalName);
            _sb.AppendLine(string.Format("//** Collection of Attribute structures for {0} */", entityName));
            _sb.AppendLine(string.Format("export class {0}Attributes {{", entityName));
            foreach (var attr in _entityMeta.Attributes) {
                _sb.AppendLine(string.Format("\t{0}:IAttribName = {{ name:\"{0}\", api_name:\"{1}\" }}", attr.LogicalName, lookupFixer(attr)));
            }
            // close out the class
            _sb.AppendLine("}");
        }

        /// <summary>
        /// Render the entity class that is passed to the web API call for init and returns
        /// </summary>
        private void RenderEntityClass()
        {
            _sb.AppendLine(string.Format("/** @description Instantiates a {0} Entity to be used for CRUD based operations", _formattedName))
                .AppendLine("* @param {object} initData An optional parameter for a create and update entities */")
                .AppendLine(string.Format("export class {0} extends Entity {{", _formattedName))
                .AppendLine("\t[key: string]: string | number")
                .AppendLine(string.Format("\tpublic route: string = \"{0}s\";", _formattedName.ToLower()))
                .AppendLine();

            foreach (var attr in _entityMeta.Attributes) {
                _sb.AppendLine(string.Format("\tpublic {0}: {1};", lookupFixer(attr), getDataType(attr)));
            }
            
            _sb.AppendLine()
                .AppendLine(string.Format("\tconstructor(initData?: I{0}) {{", _formattedName))
                .AppendLine(string.Format("\tsuper(\"{0}s\");", _formattedName.ToLower()))
                .AppendLine("\t\tif (initData == undefined) \n\t\t\treturn;");

            foreach (var attr in _entityMeta.Attributes) {
                var name = lookupFixer(attr);
                _sb.AppendLine(string.Format("\t\tthis.{0} = initData.{1};", name, name));
            }
            // close out the class
            _sb
                .AppendLine(string.Format("\t\tthis.id = initData.{0};", _entityMeta.PrimaryIdAttribute))
                .AppendLine("\t}")
                .AppendLine("}");
        }

        #region Utility functions 
        /// <summary>
        /// Format the name for the Web API call for lookups
        /// </summary>
        /// <param name="attrib"></param>
        /// <returns></returns>
        private string lookupFixer(AttributeMetadata attrib)
        {
            var name = attrib.LogicalName;
            if ((attrib.AttributeType.Value == AttributeTypeCode.Lookup) && (!attrib.IsPrimaryId.Value) && !name.Contains("activity")) {
                name = "_" + name + "_value";
            }
            return name;
        }

        /// <summary>
        /// Convert first char to upper
        /// </summary>
        /// <param name="stringValue"></param>
        /// <returns></returns>
        private string firstUpper(string val) {
            char[] a = val.ToCharArray();
            a[0] = char.ToUpper(a[0]);
            return new string(a);
        }

        /// <summary>
        /// Get data type string based on AttributeTypeCode
        /// </summary>
        /// <param name="attr"></param>
        /// <returns></returns>
        private string getDataType(AttributeMetadata attr)
        {
            var dataType = "string";
            // assign a type based on attributetypecode
            if (attr.AttributeType == AttributeTypeCode.Virtual || attr.AttributeType == AttributeTypeCode.State ||
                attr.AttributeType == AttributeTypeCode.Integer || attr.AttributeType == AttributeTypeCode.BigInt ||
                attr.AttributeType == AttributeTypeCode.Money || attr.AttributeType == AttributeTypeCode.Decimal ||
                attr.AttributeType == AttributeTypeCode.Double) {
                dataType = "number";
            }
            return dataType;
        }
        #endregion

        //#region hide me
        //private void RenderFormFields()
        //{
        //    /** @description Form Helper Class for $Name */
        //    // export class $FormName {
        //    // $Fields[public $name: string = "$name"; // ]
        //    //}
        //    var entityName = firstUpper(_entityMeta.LogicalName);

        //    _sb.AppendLine(string.Format("//** @description Form Helper Class for {0} */", entityName));
        //    _sb.AppendLine(string.Format("export class {0}Form", entityName));
        //    foreach (var attr in _entityMeta.Attributes)
        //    {
        //        var name = attr.LogicalName;
        //        _sb.AppendLine(string.Format("\t{0} string = \"{1}\"", attr, name));
        //    }
        //    // close out the class
        //    _sb.AppendLine("}");
        //}
        //private void RenderWebAPI()
        //{
        //    // /** @description Web API attribute string helper class for */
        //    //  export class $WebApiName {
        //    //      $Fields[public $fkfixer: string = "$fkfixer";]
        //    //}
        //    var entityName = firstUpper(_entityMeta.LogicalName);

        //    _sb.AppendLine(string.Format("//** @description Form Helper Class for {0} */", entityName));
        //    _sb.AppendLine(string.Format("export class {0}WebAPI", entityName));
        //    foreach (var attr in _entityMeta.Attributes)
        //    {
        //        var name = foreignKeyFixer(attr);
        //        _sb.AppendLine(string.Format("\t{0} string = \"{1}\"", attr, name));
        //    }
        //    // close out the class
        //    _sb.AppendLine("}");
        //}
        //#endregion
    }
}
