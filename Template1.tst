﻿${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    // Uncomment the constructor to change template settings.
    //Template(Settings settings)
    //{
    //    settings.IncludeProject("Project.Name");
    //    settings.OutputExtension = ".tsx";
    //}

    // First upper conversion
    string FirstUpper(Constant c)
    {
        return char.ToUpper(c.Value[0]) + c.Value.Substring(1);
    }
    // appends form on the name of a class name
    string FormName(Class c)
    {
        return c.Name + "Form";
    }
    string AttribsName(Class c)
    {
        return c.Name + "Attributes";
    }
    // appends form on the name of a class name
    string WebApiName(Class c)
    {
        return c.Name + "WebAPI";
    }
    // returns the name of the primary key for the entity
    string idname(Class c)
    {
        if (c.Fields.Any(x => x.Name == "activityid"))
            return "activityid";
        else
            return c.Name.ToLower() + "id";
    }
    // returns the WebAPI naming convention for foreign key/lookups
    string fkfixer(Field f){
        if (f.name.EndsWith("id") && (!f.name.Contains(((Class)f.Parent).Name.ToLower()) && !f.name.Contains("activity")))
            return "_"+f.name+"_value";
        else return f.name;
    }
}/** @description A CRM Typescript Project 
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
    $Classes(c => c.Namespace == "Xrm")[
    /** @description Collection interface for $Name
     */  
	export interface I$Constants[$FirstUpper] extends IRetrieveMultipleData<I$Name> { }
    /** @description WebAPI interface for $Name
     */  
    export interface I$Name {
        [key: string]: string | number
        $Fields[$fkfixer?: $Type
		]
    }
    /** @description Form Helper Class for $Name
     */ 
	export class $FormName {
		$Fields[public $name: string = "$name";
		]
	}
    /** @description Web API attribute string helper class for $Name
     */ 
    export class $WebApiName {
        $Fields[public $fkfixer: string = "$fkfixer";
		]	
    }
    /** @description Attributes Helper Class for $Name */ 
	export class $AttribsName {
		$Fields[public $name: IAttribName = { name:"$name", api_name:"$fkfixer" }
		]	
    }
    /** @description Instantiates a $Name Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class $Name extends Entity {
		[key: string]: string | number
        $Constants[public $name: $Type = "$Value";]
		$Fields[public $fkfixer: $Type;
		]	
        
        constructor(initData?: I$Name) {
			super($Constants["$Value"]);        
            if (initData == undefined) return;
			$Fields[this.$fkfixer = initData.$fkfixer;
			]
            this.id = initData.$idname;
        }
    }
	]	
}