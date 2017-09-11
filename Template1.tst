${
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
        retrieve<T>(e: Entity, params?: IParams): ng.IHttpPromise<T>;
        create<T>(e: Entity): ng.IHttpPromise<T>;
        retrieveMultiple<T>(e: Entity, params?: IParams): ng.IHttpPromise<T>;
        update<T>(e: Entity, route: string, id: string): ng.IHttpPromise<T>;
        remove<T>(e: Entity): ng.IHttpPromise<T>;
        setUrl(crmurl: string): void;
        getConfig(): any;
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
         */  
        setUrl(crmurl: string) {
            this.BaseUrl = crmurl + "/api/data/v8.2/";
        }

        /** @description Performs a CRM WebAPI Retrieve
         * @param {object} e The entity being retrieved 
         * @param {object} params The optional parameters for the retrieve
         * @return {object} Http GET Promise
         */  
		retrieve<T>(e: Entity, params?: IParams, additionalHeaders?: boolean) {
			// lets url be a concatenation of base url, entity route, and the entity id wrapped in CRM's flavor of WebAPI
            let url = this.BaseUrl + e.route + "(" + e.id + ")";
            // handles params if there are any
			if (params != undefined) url = this.addParams(url, params);
            if (additionalHeaders === true) return this.$http.get<T>(url, this.getConfig());
			return this.$http.get<T>(url);
		}
        /** @description Performs a CRM WebAPI Create
         * @param {object} e The entity being created 
         * @return {object} Http POST Promise
         */  
		create<T>(e: Entity) {
            // lets url be a concatenation of base url and route
			let url = this.BaseUrl + e.route;
            delete e.route;
			return this.$http.post<T>(url, e);
		}

        /** @description Performs a CRM WebAPI RetrieveMultiple
         * @param {object} e The entity being retrieved 
         * @param {object} params The optional parameters for the retrieve
         * @return {object} Http GET Promise
         */  
		retrieveMultiple<T>(e: Entity, params?: IParams, additionalHeaders?: boolean) {
            let url = this.BaseUrl + e.route;
			if (params != undefined) url = this.addParams(url, params);
            if (additionalHeaders === true) return this.$http.get<T>(url, this.getConfig());
			return this.$http.get<T>(url);
		}
        /** @description Performs a CRM WebAPI Update
        * @param {object} e The entity being updated
        * @param {string} route the base route for the enity webapi query string
        * @param {string} id the ID of the entity being updated
        * @return {object} Http PATCH Promise
         */  
		update<T>(e: Entity, route:string, id:string ) {
		update<T>(e: Entity, route:string, id:string ) {
			let url = this.BaseUrl + route + "(" + id + ")";
			return this.$http.patch<T>(url, e, this.getConfig());
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

        /** todo: add args for different options **/
        getConfig(): any {
            return {
                headers: {
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Prefer': 'odata.include-annotations="*"'
                }
            };
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