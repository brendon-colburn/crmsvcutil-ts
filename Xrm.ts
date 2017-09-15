/** @description A CRM Typescript Project 
 */  
module YOUR_PROJECTNAME_HERE {
    /** @description Specifies that Entities always have a url route and optionally have an id
     */  
	export abstract class Entity {
        constructor(public route: string, public id?: string) { }
    }

    /** @description Interface for retrieve multiple datasets in CRM
     *  @type generic type that corresponds with the entity being returned
     */ 
	export interface IRetrieveMultipleData<T> {
        '@odata.context': string,
        value: T[]
    }

    export interface IAttribName {
        name: string,
        api_name:string
    }

    /** @description Helper for utilizing parameters in the WebAPI angular service
     */  
    export interface IParams {
        $select?: string;
        $filter?: string;
        $orderby?: string;
        $top?: string;
        $expand?: string;
        [key: string]: string;
    }
    export interface IWebApi {
        retrieve<T>(e: Entity, params?: IParams, formattedValues?: boolean): ng.IHttpPromise<T>;
        retrieveNext<T>(e: Entity, nextLinkUrl: string, formattedValues?: boolean): ng.IHttpPromise<T>;
        create<T>(e: Entity, formattedValues?: boolean, returnRecord?: boolean): ng.IHttpPromise<T>;
        retrieveMultiple<T>(e: Entity, params?: IParams, formattedValues?: boolean, returnRecord?: boolean): ng.IHttpPromise<T>;
        update<T>(e: Entity, route: string, id: string): ng.IHttpPromise<T>;
        remove<T>(e: Entity): ng.IHttpPromise<T>;
        fetch<T>(e: Entity, fetchXml: string, formattedValues?: boolean): ng.IHttpPromise<T>;
        setUrl(crmurl: string): void;
        getConfig(formattedValues?: boolean, returnRecord?: boolean): any;
    }
    
    export interface IUtils {
        formatDate(dateVal: string): string;
        getFormattedValue(entity:any, attribute:string): string;
        isNullUndefinedEmpty(value: any): boolean;
        padLeadingZeros(num: number, precision: number): string;
        cleanGuid(guid: string, removeDashes?: boolean): string;
        reopenForm(entityName: string, entityId: string): void;
    }

    export class Utils implements IUtils {

        /** Helper method for formatting js date
            @param {string} dateVal date to be formatted, in ISO date format
        **/
        formatDate(dateVal: string):string {

            if (this.isNullUndefinedEmpty(dateVal)) {
                return "null";
            }

            var d = new Date(dateVal);
            var pad = this.padLeadingZeros;
            return (pad(d.getMonth() + 1, 2) + "/" +
                pad(d.getDate(), 2) + "/" +
                d.getFullYear() + " " +
                pad(d.getHours(), 2) + ":" +
                pad(d.getMinutes(), 2));
        }

        /**
         * @description Retrieves the formatted value for an attribute
         * @param {Entity} entity the entity containing the attribute
         * @param {string} attribute name of the attribute being retrieved
         */
        getFormattedValue(entity:any, attribute:string): string {
            var displayVal: string = null;

            if (entity[attribute] !== null) {
                displayVal = entity[attribute];

                var extendedField = attribute + "@OData.Community.Display.V1.FormattedValue";
                if (entity[extendedField] !== null) {
                    displayVal = entity[extendedField];
                }
            }
            return displayVal;
        }

        /**
         * Format a number string with leading zeroz
         * @param num
         * @param precision
         */
        padLeadingZeros (num:number, precision:number):string {
            var s = "000000000" + num;
            return s.substr(s.length - precision);
        }

        /**
         * check to see if a value is null or empty
         */
        isNullUndefinedEmpty(value: any): boolean {
            if (value === undefined) {
                return true;
            }
            if (value === null) {
                return true;
            }
            if (typeof (value) == 'string') {
                if (value.length == 0) {
                    return true;
                }
            }
            return false;
        }
        /**
         * Clean brackets and dashes from a guid
         */
        cleanGuid(guid: string, removeDashes?: boolean): string {
            guid = guid.replace("{", "").replace("}", "");

            if (removeDashes === true) {
                guid = guid.replace(/-/g, "");
            }
            return guid;
        }
        /**
         * Re-opens the form causing a true refresh
         */
        reopenForm(entityName: string, entityId: string): void {
            parent.Xrm.Utility.openEntityForm(entityName, entityId);
        }
    }

    /** @description An Angular WebAPI Service for Dynamics CRM  
     * @property {string} BaseUrl The CRM org url + WebAPI endpoint 
     * @return {object} Angular Service
     */  
	export class WebApi implements IWebApi {
        private BaseUrl: string; 

        // a method for injecting angular1 components in typescript
		public static $inject = [
			'$http'
		];

        // when constructed we set the angular http service privately along with the methods necessary for CRUD operations
		constructor(private $http: ng.IHttpService) { }

        /** @description Required method that constructs the BaseUrl for the Service 
         * @param {string} crmurl The crm org url 
         **/  
        setUrl(crmurl: string) {
            this.BaseUrl = crmurl + "/api/data/v8.2/";
        }

        /** @description Performs a CRM WebAPI Retrieve
         * @param {object} e The entity being retrieved 
         * @param {object} params The optional parameters for the retrieve
         * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
         * @return {object} Http GET Promise
         */  
		retrieve<T>(e: Entity, params?: IParams, formattedValues?: boolean) {
			// lets url be a concatenation of base url, entity route, and the entity id wrapped in CRM's flavor of WebAPI
            let url = this.BaseUrl + e.route + "(" + e.id + ")";
            // handles params if there are any
			if (params != undefined) url = this.addParams(url, params);
            if (formattedValues === true) {
                return this.$http.get<T>(url, this.getConfig(formattedValues));
            }
            else {
			return this.$http.get<T>(url);
		}
		}

        /** @description Performs a CRM WebAPI Retrieve for a nextLink URL on expanded attributes or collections
         * @param {object} e The entity being retrieved 
         * @param {string} nextLinkUrl the URL for the next retrieve 
         * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
         * @return {object} Http GET Promise
         */
        retrieveNext<T>(e: Entity, nextLinkUrl: string, formattedValues?: boolean) {
            // handles params if there are any
            if (formattedValues === true) {
                return this.$http.get<T>(nextLinkUrl, this.getConfig(formattedValues));
            }
            else {
                return this.$http.get<T>(nextLinkUrl);
            }
        }

        /** @description Performs a CRM WebAPI Create
         * @param {object} e The entity being created 
         * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
         * @param {boolean} returnRecord optional flag indicating whether to return an the updated record
         * @return {object} Http POST Promise
         */  
        create<T>(e: Entity, formattedValues?: boolean, returnRecord?: boolean) {
            // lets url be a concatenation of base url and route
			let url = this.BaseUrl + e.route;
            delete e.route;

			return this.$http.post<T>(url, e, this.getConfig(formattedValues, returnRecord));
		}

        /** @description Performs a CRM WebAPI RetrieveMultiple
         * @param {object} e The entity being retrieved 
         * @param {object} params The optional parameters for the retrieve
         * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
         * @return {object} Http GET Promise
         **/ 
        retrieveMultiple<T>(e: Entity, params?: IParams, formattedValues?: boolean) {
            let url = this.BaseUrl + e.route;
			if (params != undefined) url = this.addParams(url, params);
            if (formattedValues === true) {
                return this.$http.get<T>(url, this.getConfig(formattedValues));
            }
            else {
			return this.$http.get<T>(url);
		}
        }

        /** @description Performs a CRM WebAPI Update
        * @param {object} e The entity being updated
        * @param {string} route the base route for the enity webapi query string
        * @param {string} id the ID of the entity being updated
         * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
         * @param {boolean} returnRecord optional flag indicating whether to return an the updated record
        * @return {object} Http PATCH Promise
         */  
        update<T>(e: Entity, route: string, id: string, formattedValues?: boolean, returnRecord?: boolean ) {
            // ensure that no curly braces included
            id = new Utils().cleanGuid(id);
			let url = this.BaseUrl + route + "(" + id + ")";

            return this.$http.patch<T>(url, e, this.getConfig(formattedValues, returnRecord));
        }

        /** @description Performs a CRM WebAPI call using FetchXml as a query 
         * @param {object} e The entity being updated
         * @param {string} fetchXML fetch query being passed
         * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
         * @return {object} Http PATCH Promise
         */
        fetch<T>(e: Entity, fetchXml: string, formattedValues?: boolean) {
            // encode the fetch XML string so we can pass via a URL
            var fetchXmlEncoded = encodeURIComponent(fetchXml);
            
            let url = this.BaseUrl + e.route + "?fetchXml=" + fetchXmlEncoded;

            if (formattedValues === true) {
                return this.$http.get<T>(url, this.getConfig(formattedValues));
            }
            else {
                return this.$http.get<T>(url);
            }
        }

        /** @description Performs a CRM WebAPI Delete
         * @param {object} e The entity being deleted 
         * @return {object} Http DELETE Promise
         */  
		remove<T>(e: Entity) {
			let url = this.BaseUrl + e.route;
			return this.$http.delete<T>(url);
		}

        /** @description Adds together parameters in an oData string
         * @param {string} url The url string without params
         * @param {object} params The parameters to be added to the url string
         * @return {string} The url string with parameters
         */  
		addParams(url: string, params: IParams): string {
			url += "?";
			angular.forEach(Object.keys(params), function (v, k) {
                if (k == 0 || k == this.length)
					url += v + '=' + params[v];
				else
					url += '&' + v + '=' + params[v];
			});
			return url;
		}

        /** @description build the additional headers configuration element that will be passed on the HTTP call
        * @param {boolean} formattedValues optional flag indicating whether to return formatted attibutes values
        * @param {boolean} returnRecord optional flag indicating whether to return an the updated record
        **/
        getConfig(formattedValues?:boolean, returnRecord?:boolean): any {
            var config = {
                headers: {
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                }
            };

            // check for the optional arguments 
            var prefer = [];
            if (formattedValues === true) {
                prefer.push('odata.include-annotations="*"');
            }

            if (returnRecord === true) {
                prefer.push('return=representation');
            }

            if (prefer.length > 0) {
                config.headers['Prefer'] = prefer.join(",");
            }
            return config;
        } 
	}
    
    /** @description Collection interface for gnext_determinationworksheetitem
     */  
	export interface IGnext_determinationworksheetitems extends IRetrieveMultipleData<Ignext_determinationworksheetitem> { }
    /** @description WebAPI interface for gnext_determinationworksheetitem
     */  
    export interface Ignext_determinationworksheetitem {
        [key: string]: string | number
        gnext_determinationvalue?: string
		createdonbehalfbyyominame?: string
		modifiedonbehalfby?: string
		statecode?: number
		owneridname?: string
		createdon?: string
		statecodename?: number
		owninguser?: string
		createdonbehalfby?: string
		gnext_determinationjustification?: string
		importsequencenumber?: number
		gnext_determinationworksheetitemid?: string
		gnext_name?: string
		utcconversiontimezonecode?: number
		createdbyyominame?: string
		owningbusinessunit?: string
		modifiedbyname?: string
		owningteam?: string
		modifiedby?: string
		modifiedbyyominame?: string
		createdby?: string
		timezoneruleversionnumber?: number
		owneridtype?: string
		statuscodename?: number
		gnext_fieldlabelname?: string
		owneridyominame?: string
		modifiedon?: string
		gnext_fieldlabel?: string
		modifiedonbehalfbyyominame?: string
		statuscode?: string
		createdbyname?: string
		gnext_publicsafetyofficer?: string
		createdonbehalfbyname?: string
		modifiedonbehalfbyname?: string
		gnext_publicsafetyofficername?: string
		versionnumber?: number
		_ownerid_value?: string
		overriddencreatedon?: string
		
    }
    /** @description Form Helper Class for gnext_determinationworksheetitem
     */ 
	export class gnext_determinationworksheetitemForm {
		public gnext_determinationvalue: string = "gnext_determinationvalue";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public statecode: string = "statecode";
		public owneridname: string = "owneridname";
		public createdon: string = "createdon";
		public statecodename: string = "statecodename";
		public owninguser: string = "owninguser";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_determinationjustification: string = "gnext_determinationjustification";
		public importsequencenumber: string = "importsequencenumber";
		public gnext_determinationworksheetitemid: string = "gnext_determinationworksheetitemid";
		public gnext_name: string = "gnext_name";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public createdbyyominame: string = "createdbyyominame";
		public owningbusinessunit: string = "owningbusinessunit";
		public modifiedbyname: string = "modifiedbyname";
		public owningteam: string = "owningteam";
		public modifiedby: string = "modifiedby";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public createdby: string = "createdby";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public owneridtype: string = "owneridtype";
		public statuscodename: string = "statuscodename";
		public gnext_fieldlabelname: string = "gnext_fieldlabelname";
		public owneridyominame: string = "owneridyominame";
		public modifiedon: string = "modifiedon";
		public gnext_fieldlabel: string = "gnext_fieldlabel";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public statuscode: string = "statuscode";
		public createdbyname: string = "createdbyname";
		public gnext_publicsafetyofficer: string = "gnext_publicsafetyofficer";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public gnext_publicsafetyofficername: string = "gnext_publicsafetyofficername";
		public versionnumber: string = "versionnumber";
		public ownerid: string = "ownerid";
		public overriddencreatedon: string = "overriddencreatedon";
		
	}
    /** @description Web API attribute string helper class for gnext_determinationworksheetitem
     */ 
    export class gnext_determinationworksheetitemWebAPI {
        public gnext_determinationvalue: string = "gnext_determinationvalue";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public statecode: string = "statecode";
		public owneridname: string = "owneridname";
		public createdon: string = "createdon";
		public statecodename: string = "statecodename";
		public owninguser: string = "owninguser";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_determinationjustification: string = "gnext_determinationjustification";
		public importsequencenumber: string = "importsequencenumber";
		public gnext_determinationworksheetitemid: string = "gnext_determinationworksheetitemid";
		public gnext_name: string = "gnext_name";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public createdbyyominame: string = "createdbyyominame";
		public owningbusinessunit: string = "owningbusinessunit";
		public modifiedbyname: string = "modifiedbyname";
		public owningteam: string = "owningteam";
		public modifiedby: string = "modifiedby";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public createdby: string = "createdby";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public owneridtype: string = "owneridtype";
		public statuscodename: string = "statuscodename";
		public gnext_fieldlabelname: string = "gnext_fieldlabelname";
		public owneridyominame: string = "owneridyominame";
		public modifiedon: string = "modifiedon";
		public gnext_fieldlabel: string = "gnext_fieldlabel";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public statuscode: string = "statuscode";
		public createdbyname: string = "createdbyname";
		public gnext_publicsafetyofficer: string = "gnext_publicsafetyofficer";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public gnext_publicsafetyofficername: string = "gnext_publicsafetyofficername";
		public versionnumber: string = "versionnumber";
		public _ownerid_value: string = "_ownerid_value";
		public overriddencreatedon: string = "overriddencreatedon";
			
    }
    /** @description Attributes Helper Class for gnext_determinationworksheetitem */ 
	export class gnext_determinationworksheetitemAttributes {
		public gnext_determinationvalue: IAttribName = { name:"gnext_determinationvalue", api_name:"gnext_determinationvalue" }
		public createdonbehalfbyyominame: IAttribName = { name:"createdonbehalfbyyominame", api_name:"createdonbehalfbyyominame" }
		public modifiedonbehalfby: IAttribName = { name:"modifiedonbehalfby", api_name:"modifiedonbehalfby" }
		public statecode: IAttribName = { name:"statecode", api_name:"statecode" }
		public owneridname: IAttribName = { name:"owneridname", api_name:"owneridname" }
		public createdon: IAttribName = { name:"createdon", api_name:"createdon" }
		public statecodename: IAttribName = { name:"statecodename", api_name:"statecodename" }
		public owninguser: IAttribName = { name:"owninguser", api_name:"owninguser" }
		public createdonbehalfby: IAttribName = { name:"createdonbehalfby", api_name:"createdonbehalfby" }
		public gnext_determinationjustification: IAttribName = { name:"gnext_determinationjustification", api_name:"gnext_determinationjustification" }
		public importsequencenumber: IAttribName = { name:"importsequencenumber", api_name:"importsequencenumber" }
		public gnext_determinationworksheetitemid: IAttribName = { name:"gnext_determinationworksheetitemid", api_name:"gnext_determinationworksheetitemid" }
		public gnext_name: IAttribName = { name:"gnext_name", api_name:"gnext_name" }
		public utcconversiontimezonecode: IAttribName = { name:"utcconversiontimezonecode", api_name:"utcconversiontimezonecode" }
		public createdbyyominame: IAttribName = { name:"createdbyyominame", api_name:"createdbyyominame" }
		public owningbusinessunit: IAttribName = { name:"owningbusinessunit", api_name:"owningbusinessunit" }
		public modifiedbyname: IAttribName = { name:"modifiedbyname", api_name:"modifiedbyname" }
		public owningteam: IAttribName = { name:"owningteam", api_name:"owningteam" }
		public modifiedby: IAttribName = { name:"modifiedby", api_name:"modifiedby" }
		public modifiedbyyominame: IAttribName = { name:"modifiedbyyominame", api_name:"modifiedbyyominame" }
		public createdby: IAttribName = { name:"createdby", api_name:"createdby" }
		public timezoneruleversionnumber: IAttribName = { name:"timezoneruleversionnumber", api_name:"timezoneruleversionnumber" }
		public owneridtype: IAttribName = { name:"owneridtype", api_name:"owneridtype" }
		public statuscodename: IAttribName = { name:"statuscodename", api_name:"statuscodename" }
		public gnext_fieldlabelname: IAttribName = { name:"gnext_fieldlabelname", api_name:"gnext_fieldlabelname" }
		public owneridyominame: IAttribName = { name:"owneridyominame", api_name:"owneridyominame" }
		public modifiedon: IAttribName = { name:"modifiedon", api_name:"modifiedon" }
		public gnext_fieldlabel: IAttribName = { name:"gnext_fieldlabel", api_name:"gnext_fieldlabel" }
		public modifiedonbehalfbyyominame: IAttribName = { name:"modifiedonbehalfbyyominame", api_name:"modifiedonbehalfbyyominame" }
		public statuscode: IAttribName = { name:"statuscode", api_name:"statuscode" }
		public createdbyname: IAttribName = { name:"createdbyname", api_name:"createdbyname" }
		public gnext_publicsafetyofficer: IAttribName = { name:"gnext_publicsafetyofficer", api_name:"gnext_publicsafetyofficer" }
		public createdonbehalfbyname: IAttribName = { name:"createdonbehalfbyname", api_name:"createdonbehalfbyname" }
		public modifiedonbehalfbyname: IAttribName = { name:"modifiedonbehalfbyname", api_name:"modifiedonbehalfbyname" }
		public gnext_publicsafetyofficername: IAttribName = { name:"gnext_publicsafetyofficername", api_name:"gnext_publicsafetyofficername" }
		public versionnumber: IAttribName = { name:"versionnumber", api_name:"versionnumber" }
		public ownerid: IAttribName = { name:"ownerid", api_name:"_ownerid_value" }
		public overriddencreatedon: IAttribName = { name:"overriddencreatedon", api_name:"overriddencreatedon" }
			
    }
    /** @description Instantiates a gnext_determinationworksheetitem Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class gnext_determinationworksheetitem extends Entity {
		[key: string]: string | number
        public route: string = "gnext_determinationworksheetitems";
		public gnext_determinationvalue: string;
		public createdonbehalfbyyominame: string;
		public modifiedonbehalfby: string;
		public statecode: number;
		public owneridname: string;
		public createdon: string;
		public statecodename: number;
		public owninguser: string;
		public createdonbehalfby: string;
		public gnext_determinationjustification: string;
		public importsequencenumber: number;
		public gnext_determinationworksheetitemid: string;
		public gnext_name: string;
		public utcconversiontimezonecode: number;
		public createdbyyominame: string;
		public owningbusinessunit: string;
		public modifiedbyname: string;
		public owningteam: string;
		public modifiedby: string;
		public modifiedbyyominame: string;
		public createdby: string;
		public timezoneruleversionnumber: number;
		public owneridtype: string;
		public statuscodename: number;
		public gnext_fieldlabelname: string;
		public owneridyominame: string;
		public modifiedon: string;
		public gnext_fieldlabel: string;
		public modifiedonbehalfbyyominame: string;
		public statuscode: string;
		public createdbyname: string;
		public gnext_publicsafetyofficer: string;
		public createdonbehalfbyname: string;
		public modifiedonbehalfbyname: string;
		public gnext_publicsafetyofficername: string;
		public versionnumber: number;
		public _ownerid_value: string;
		public overriddencreatedon: string;
			
        
        constructor(initData?: Ignext_determinationworksheetitem) {
			super("gnext_determinationworksheetitems");        
            if (initData == undefined) return;
			this.gnext_determinationvalue = initData.gnext_determinationvalue;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.statecode = initData.statecode;
			this.owneridname = initData.owneridname;
			this.createdon = initData.createdon;
			this.statecodename = initData.statecodename;
			this.owninguser = initData.owninguser;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.gnext_determinationjustification = initData.gnext_determinationjustification;
			this.importsequencenumber = initData.importsequencenumber;
			this.gnext_determinationworksheetitemid = initData.gnext_determinationworksheetitemid;
			this.gnext_name = initData.gnext_name;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.createdbyyominame = initData.createdbyyominame;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.modifiedbyname = initData.modifiedbyname;
			this.owningteam = initData.owningteam;
			this.modifiedby = initData.modifiedby;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.createdby = initData.createdby;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.owneridtype = initData.owneridtype;
			this.statuscodename = initData.statuscodename;
			this.gnext_fieldlabelname = initData.gnext_fieldlabelname;
			this.owneridyominame = initData.owneridyominame;
			this.modifiedon = initData.modifiedon;
			this.gnext_fieldlabel = initData.gnext_fieldlabel;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.statuscode = initData.statuscode;
			this.createdbyname = initData.createdbyname;
			this.gnext_publicsafetyofficer = initData.gnext_publicsafetyofficer;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.gnext_publicsafetyofficername = initData.gnext_publicsafetyofficername;
			this.versionnumber = initData.versionnumber;
			this._ownerid_value = initData._ownerid_value;
			this.overriddencreatedon = initData.overriddencreatedon;
			
            this.id = initData.gnext_determinationworksheetitemid;
        }
    }
		
}