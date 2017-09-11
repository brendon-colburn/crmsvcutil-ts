/** @description A CRM Typescript Project 
 */  
module MCS.WebResources {
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
    
    /** @description Collection interface for gnext_application
     */  
	export interface IGnext_applications extends IRetrieveMultipleData<Ignext_application> { }
    /** @description WebAPI interface for gnext_application
     */  
    export interface Ignext_application {
        [key: string]: string | number
        gnext_theapplicantwishestofileinthiscapacity?: string
		gnext_spouseaddress1?: string
		gnext_theapplicantwishestofileinthiscapacityname?: number
		gnext_filingextensionresponsesent?: string
		gnext_psohavechildren_wfsname?: number
		gnext_submitmyownmedicalrecordsname?: number
		gnext_nationalfallenfirefightersfoundationname?: number
		gnext_claimantrepresentationconfirmation?: string
		gnext_phone?: string
		gnext_psohavechildrenname?: number
		gnext_officerssn?: string
		gnext_appfiledundermedicalretirementdisabilityname?: number
		gnext_determinedworkerscompensationname?: number
		gnext_publicsafetyofficerphonenumber?: string
		gnext_spousecity?: string
		gnext_offworkedatanyjobs_fol_theinjname?: number
		gnext_hasaclaimbeenfiledunder?: string
		gnext_causeofinjuryname?: number
		gnext_officermarriedtoanyoneelse?: string
		gnext_applicationassignedname?: number
		gnext_appfiledundersocialsecurityname?: number
		gnext_bypasspreapplicationname?: number
		gnext_nameofemployingagency?: string
		gnext_zip?: string
		gnext_datesubmittedcalculated?: string
		gnext_publicsafetyofficersmaritalstatusname?: number
		gnext_otherbenefitsfiledname?: number
		gnext_agencysubmissionstatusname?: number
		gnext_injurytypeelectricity?: string
		gnext_authorizedtorepresenttheofficer?: string
		gnext_injuryrelatedtoeventsof20010911?: string
		gnext_toxicologyanalysisname?: number
		gnext_officerhaddesigneeorlifeinsbeneficiary?: string
		statecodename?: number
		gnext_filedstatelineofdutydeathbenefitsname?: number
		gnext_certificationofapplicationname?: number
		gnext_digitallysignname?: number
		gnext_officerhadlifeinsurancedesignee?: string
		gnext_applicanttypename?: number
		gnext_country?: string
		gnext_employingagencyheadcity?: string
		gnext_firstname?: string
		gnext_filedstatelineofdutydeathbenefits?: string
		gnext_officermarriedtoanyoneelsename?: number
		gnext_currentdatetime?: string
		gnext_dutystatus?: string
		gnext_applicantrelationshiptothepsoname?: number
		gnext_injuryrelatedtoeventsof20010911name?: number
		gnext_spousestatename?: number
		gnext_officermaritalstatus?: string
		gnext_dcretirementanddisabilityactname?: number
		gnext_employingagencycity?: string
		importsequencenumber?: number
		gnext_describeofficerworkingorvolunteering?: string
		gnext_injurytypeheartattack?: string
		gnext_ifnotretiredexplain?: string
		gnext_econdolencedraftedname?: number
		gnext_applicanteditrequiredname?: number
		gnext_iscontactinformationforagencyheadthesame?: string
		gnext_officerhavechildrenattimeofinjury?: string
		gnext_bypassapplication?: string
		owningbusinessunit?: string
		gnext_concernsofpolicesurvivorsinc?: string
		gnext_spousetelephonenumnber?: string
		gnext_numberofparents?: string
		gnext_applicationid?: string
		createdonbehalfbyyominame?: string
		gnext_agencybeenauthorizedtorepresentname?: number
		gnext_psohavechildren_wfs?: string
		gnext_injurytypeclimaticconditionsname?: number
		gnext_officerchildren_wfs?: string
		gnext_numberofotherbeneficiariesname?: number
		gnext_psoparentfirstname?: string
		gnext_appfiledunderworkerscompensationname?: number
		gnext_otherbenefitsfiled?: string
		gnext_employingagencyline1?: string
		gnext_anyyoucannotprovidename?: number
		gnext_publicsafetyofficersmaritalstatus?: string
		gnext_injurytypeclimaticconditions?: string
		gnext_bypassapplicationdate?: string
		versionnumber?: number
		gnext_causeofinjuryother?: string
		gnext_spousealternatephonenumber?: string
		gnext_applicationstagename?: number
		gnext_certifyinformationastrue?: string
		gnext_spousecountry?: string
		gnext_injurytypeinfectiousdiseasename?: number
		gnext_nationalfallenfirefightersfoundation_wfsname?: number
		gnext_agencyservicejurisdictionname?: number
		gnext_officermaritalstatusattimeofdeathname?: number
		gnext_middlename?: string
		gnext_setapplicantnamename?: number
		gnext_psohavechildren?: string
		gnext_officersalternatephone?: string
		gnext_filingextensionreviewedname?: number
		gnext_employingagencyheadgeneralphone?: string
		gnext_econdolencesentname?: number
		gnext_ifotherengagementtype?: string
		gnext_anyyoucannotprovide?: string
		gnext_deteminationissuedsocialsecurity?: string
		gnext_officermarriedattimeofinjury_wfsname?: number
		gnext_officerdateofdisability?: string
		gnext_econdolencesent?: string
		gnext_officercurrentlyworkingorvolunteering?: string
		gnext_numberofchildrenname?: number
		gnext_deteminationissuedmedicalretirementdisname?: number
		gnext_officermiddlename?: string
		gnext_city?: string
		gnext_filedeathreport?: string
		gnext_spouseaddress2?: string
		gnext_officerworkedotherplacespostinjury?: string
		gnext_didthepsohavesurvivingadultchildrenname?: number
		gnext_address1?: string
		gnext_ifotheragencyclassification?: string
		gnext_anyyoucannotprovideexplanation?: string
		gnext_authorizeanothertoaccess?: string
		gnext_datesigned?: string
		gnext_psoparentlastname?: string
		gnext_september11thvictimcompensationfund?: string
		gnext_applicationvalidatedname?: number
		gnext_officerdateofmedicalretirement?: string
		gnext_september11tvictimcompensationfundfinal?: string
		gnext_otherorganization?: string
		gnext_officerhadsurvivingparentsname?: number
		gnext_numberofadultchildren?: string
		gnext_numberofotherbeneficiaries?: string
		gnext_hasafinaldeterminationbeenissuedfor?: string
		gnext_officerhadchildrenpreviousrelationshipname?: number
		gnext_agencyrelationshiptopsoname?: number
		gnext_applicantsstatement1?: string
		gnext_publicsafetyofficercountry?: string
		createdonbehalfbyname?: string
		gnext_injurytypestressorstrain?: string
		gnext_agencyservicejurisdiction?: string
		gnext_claimantrepresentationconfirmationname?: number
		gnext_medicalretirementdate?: string
		gnext_filedeathreportname?: number
		gnext_state?: string
		gnext_injurytypeviralinfectionname?: number
		gnext_officeremployedinnonciviliancapacity?: string
		gnext_attorneyforspouse?: string
		gnext_lastname?: string
		gnext_applicationassigned?: string
		gnext_typeofauthorizedrepresentative?: string
		gnext_determinedworkerscompensation?: string
		_ownerid_value?: string
		gnext_prefixortitle?: string
		owneridname?: string
		gnext_certificationofapplication?: string
		gnext_indicationofvoluntaryintoxication?: string
		gnext_officerengagementattimeofinjury?: string
		gnext_nootherbenefitsfiledname?: number
		gnext_injurytypestrokename?: number
		gnext_officermaritalstatusattimeofdeath?: string
		gnext_officerdateofdeath?: string
		gnext_createpsorecordname?: number
		gnext_injurytypevehicleboatairplanehelicopter?: string
		gnext_certifyinformationastruename?: number
		gnext_anyindicationofgrossnegligencename?: number
		gnext_applicationreceivedname?: number
		traversedpath?: string
		gnext_otherclaimsfiled?: string
		gnext_officeremployedinnonciviliancapacityname?: number
		gnext_injurytypeother?: string
		gnext_applicationsubmittedname?: number
		gnext_filingextensionreceivedname?: number
		gnext_publicsafetyofficerstate?: string
		gnext_publicsafetyofficerpriormarriagesname?: number
		gnext_injurytypeexplosives?: string
		gnext_dutystatusname?: number
		gnext_psoparentstate?: string
		gnext_agencybeenauthorizedtorepresent?: string
		gnext_ifyouknoworiginalclaimnumberpleaselist?: string
		gnext_publicsafetyofficeralternatephonenumber?: string
		gnext_injurytypevehicleboatairplanehelicoptername?: number
		gnext_psoparentstatename?: number
		gnext_injurytypephysicalblows?: string
		gnext_determinedstatelineofdutydeathbenefits?: string
		gnext_authorizeanothertoaccessname?: number
		gnext_september11tvictimcompensationfundfinalname?: number
		gnext_nootherbenefitsdeterminedname?: number
		gnext_claimantidyominame?: string
		gnext_officerfirstname?: string
		gnext_econdolencedrafted?: string
		gnext_appfiledundersocialsecurity?: string
		gnext_lastchildentityupdateddate?: string
		gnext_september11thvictimcompensationfundname?: number
		gnext_applicationreceived?: string
		gnext_injurytypeelectricityname?: number
		gnext_numberofchildren?: string
		createdonbehalfby?: string
		gnext_nameofminorchildsparentorlegalguardian?: string
		gnext_officercurrentlyworkingorvolunteeringname?: number
		_gnext_psoid_value?: string
		gnext_nootherbenefitsdetermined?: string
		gnext_publicsafetyofficerpriormarriages_wfs?: string
		gnext_injurytyperadiation?: string
		gnext_attorneyforspouseyominame?: string
		gnext_didthepsohavesurvivingadultchildren?: string
		gnext_noncivilianmilitarycapacityexplanation?: string
		gnext_numberofadultchildrenname?: number
		gnext_bypasspreapplication?: string
		gnext_specifyothertypeofauthrep?: string
		gnext_applicationreferenceidentifier?: string
		gnext_federalemployeescompensationactfinalname?: number
		gnext_officerengagementattimeofinjuryname?: number
		gnext_officerhaddesigneeorlifeinsbeneficiaryname?: number
		gnext_employingagencyheadcountry?: string
		gnext_publicsafetyofficerpriormarriages_wfsname?: number
		createdon?: string
		gnext_psoparenttelephone?: string
		gnext_hasafinaldeterminationbeenissuedforname?: number
		gnext_agencyrelationshiptopso?: string
		gnext_publicsafetyofficerstatename?: number
		gnext_unvalidateddocs?: string
		gnext_agencyclassification?: string
		gnext_applicationtype?: string
		gnext_needsadditionalrequireddocumentsname?: number
		gnext_employingagencystate?: string
		gnext_numberofparentsname?: number
		gnext_numberoflifeinsurancedesignees?: string
		gnext_numberofdesignees?: string
		gnext_officerchildren_wfsname?: number
		gnext_numberoftimespsowasmarried?: string
		gnext_publicsafetyofficeraddressline2?: string
		gnext_officermarriedattimeofinjury_wfs?: string
		gnext_notification1?: string
		gnext_notification2?: string
		gnext_notification3?: string
		gnext_officerhadlifeinsurancedesigneename?: number
		gnext_concernsofpolicesurvivorsinc_wfsname?: number
		gnext_undergoindependentmedicalexpertreview?: string
		gnext_employingagencyheadstate?: string
		gnext_psoparentzipcode?: string
		gnext_appholderidname?: string
		gnext_address2?: string
		gnext_spousezipcode?: string
		gnext_employingagencycountry?: string
		gnext_injurytypevascularrupturename?: number
		gnext_whatisthehighesteducationalleveltheoffice?: string
		gnext_officertitle?: string
		gnext_authorizedtorepresentactingonbehalfofname?: number
		gnext_anyindicationofgrossnegligence?: string
		_gnext_appholderid_value?: string
		statecode?: number
		statuscode?: string
		gnext_officersphonenumber?: string
		gnext_officermedicallyretired?: string
		gnext_applicantsstatement2?: string
		gnext_nameofindividualyourepresent?: string
		gnext_officermarriedattimeofinjury?: string
		gnext_employingagencyheadfirstname?: string
		gnext_applicantrelationship?: string
		gnext_officermaritalstatusname?: number
		gnext_officerchildren?: string
		gnext_relationshiptopsoname?: number
		gnext_otherbenefitsdetermined?: string
		gnext_setapplicantname?: string
		gnext_concernsofpolicesurvivorsinc_wfs?: string
		gnext_areyouauthorizedtorepresentthispersonname?: number
		gnext_employingagencyzip?: string
		gnext_injurytypeviralinfection?: string
		gnext_employingagencyheadaddressline1?: string
		timezoneruleversionnumber?: number
		gnext_concernsofpolicesurvivorsincname?: number
		modifiedonbehalfbyyominame?: string
		gnext_otherstate?: string
		gnext_indicationofowndisabilityorinjuryname?: number
		gnext_designateanauthorizedrepresentative?: string
		gnext_relationshiptopso?: string
		owninguser?: string
		gnext_dutystatusdescribe?: string
		gnext_signingasauthorizedrepname?: number
		gnext_injurytypevascularrupture?: string
		gnext_officerdateofbirth?: string
		gnext_injurytypesharpinstrumentsbluntobjectsname?: number
		gnext_datereceived?: string
		gnext_injurytypestroke?: string
		gnext_describetypeofauthorizedrepresentativeoth?: string
		gnext_injurytyperadiationname?: number
		gnext_unvalidateddocsname?: number
		gnext_needsadditionalrequireddocuments?: string
		gnext_deteminationissuedworkerscompensationname?: number
		gnext_employingagencyline2?: string
		gnext_deteminationissuedmedicalretirementdis?: string
		gnext_intentionalmisconductexplanation?: string
		gnext_officerdateofincident?: string
		gnext_officerchildrenname?: number
		gnext_iscontactinformationforagencyheadthesamename?: number
		gnext_applicationonholdname?: number
		gnext_hasaclaimbeenfiledundername?: number
		gnext_injurytypeoccupationaldisease?: string
		gnext_spousestate?: string
		gnext_name?: string
		gnext_federalemployeescompensationact?: string
		gnext_describeotherprefix?: string
		gnext_numberoflifeinsurancedesigneesname?: number
		gnext_representingapplicantname?: number
		gnext_employingagencyheadaddressline2?: string
		gnext_injurytypeexplosivesname?: number
		gnext_injurytypeothername?: number
		gnext_designateanauthorizedrepresentativename?: number
		gnext_agencysubmissionstatus?: string
		gnext_agencyclassificationname?: number
		gnext_spouselastname?: string
		gnext_officermarriedattimeofinjuryname?: number
		owneridtype?: string
		gnext_spouseemail?: string
		gnext_attorneyforspousename?: string
		gnext_nationalfallenfirefightersfoundation?: string
		gnext_describeotherdetermination?: string
		gnext_injurytypephysicalblowsname?: number
		gnext_injurytypesharpinstrumentsbluntobjects?: string
		gnext_psosuffix?: string
		gnext_publicsafetyofficerpriormarriages?: string
		gnext_injurytypefiresmokeinhalation?: string
		gnext_applicantsstatement3?: string
		gnext_signingasauthorizedrep?: string
		gnext_federalemployeescompensationactname?: number
		gnext_representingapplicant?: string
		createdbyyominame?: string
		gnext_federalemployeescompensationactfinal?: string
		gnext_officerhavechildrenattimeofinjuryname?: number
		gnext_prefixortitlename?: number
		gnext_employingagencyheadlastname?: string
		gnext_survivingspousedateofmarriagetopso?: string
		gnext_deteminationissuedsocialsecurityname?: number
		gnext_causeofinjury?: string
		gnext_submitmyownmedicalrecords?: string
		gnext_submittedname?: number
		gnext_filingextensionresponsesentname?: number
		gnext_appfiledundermedicalretirementdisability?: string
		gnext_spousemiddlename?: string
		createdbyname?: string
		gnext_deteminationissuedworkerscompensation?: string
		modifiedonbehalfby?: string
		owningteam?: string
		gnext_applicationvalidated?: string
		gnext_applicationonhold?: string
		gnext_injurytypeheartattackname?: number
		gnext_officerlastname?: string
		gnext_authorizedtorepresentactingonbehalfof?: string
		gnext_injurytypeinfectiousdisease?: string
		gnext_numberoftimespsowasmarriedname?: number
		gnext_bypassapplicationname?: number
		gnext_describeotherfiled?: string
		gnext_createpsorecord?: string
		gnext_typeofauthorizedrepresentativename?: number
		gnext_employingagencyheadstatename?: number
		gnext_areyouauthorizedtorepresentthisperson?: string
		gnext_injurytypestressorstrainname?: number
		gnext_psoparentmiddlename?: string
		gnext_otherclaimsfiledname?: number
		gnext_ifotherspecifyrelationship?: string
		gnext_employingagencyheadalternatelphone?: string
		gnext_injurytypeoccupationaldiseasename?: number
		gnext_claimnumberassigned?: string
		gnext_spousefirstname?: string
		_stageid_value?: string
		gnext_indicationofowndisabilityorinjury?: string
		gnext_employingagencyheademailaddress?: string
		gnext_publicsafetyofficerzip?: string
		modifiedbyname?: string
		gnext_authorizedreporapplicantsignature?: string
		gnext_dcretirementanddisabilityact?: string
		gnext_psonumberofchildrenattimeofinjuryname?: number
		gnext_owninjuryintentexplanation?: string
		gnext_indicationofmisconduct?: string
		gnext_psoparentcountry?: string
		gnext_employingagencystatename?: number
		gnext_appfiledunderworkerscompensation?: string
		gnext_numberofdesigneesname?: number
		gnext_psorecordcreated?: string
		modifiedonbehalfbyname?: string
		modifiedby?: string
		gnext_offworkedatanyjobs_fol_theinj?: string
		owneridyominame?: string
		gnext_employingagencyheadzip?: string
		_gnext_claimid_value?: string
		gnext_authorizedtorepresenttheofficername?: number
		gnext_claimidname?: string
		gnext_filingextensionreceived?: string
		gnext_grossnegligenceexplanation?: string
		gnext_injurytypechemicals?: string
		gnext_applicationtypename?: number
		gnext_submitted?: string
		gnext_digitallysign?: string
		gnext_toxicologyanalysis?: string
		gnext_undergoindependentmedicalexpertreviewname?: number
		overriddencreatedon?: string
		gnext_applicantrelationshipname?: number
		gnext_psoidname?: string
		gnext_determinedstatelineofdutydeathbenefitsname?: number
		gnext_otherbenefitsdeterminedname?: number
		gnext_officerhadchildrenpreviousrelationship?: string
		gnext_injurytypefiresmokeinhalationname?: number
		gnext_bypasspreapplicationdate?: string
		gnext_injurytypechemicalsname?: number
		gnext_psorecordcreatedname?: number
		gnext_statename?: number
		gnext_nootherbenefitsfiled?: string
		utcconversiontimezonecode?: number
		gnext_indicationofvoluntaryintoxicationname?: number
		gnext_publicsafetyofficercity?: string
		gnext_psoparentaddress2?: string
		gnext_numberoftimesmarried?: string
		gnext_psoparentaddress1?: string
		gnext_requireddocumentsuploadedorjustified?: string
		gnext_publicsafetyofficerdateofmedicalretiremen?: string
		gnext_claimantidname?: string
		gnext_applicantrelationshiptothepso?: string
		gnext_nationalfallenfirefightersfoundation_wfs?: string
		gnext_employingagencyheadtitle?: string
		gnext_indicationofmisconductname?: number
		gnext_psoparentcity?: string
		gnext_numberoftimesmarriedname?: number
		gnext_medicalquestionnairecompletedbyphysician?: string
		gnext_dcretirementanddisabilityfinalname?: number
		statuscodename?: number
		gnext_injurytypebullets?: string
		gnext_publicsafetyofficeremailaddress?: string
		_processid_value?: string
		modifiedon?: string
		gnext_hasofficerreceivedvocationaltrainingname?: number
		gnext_filingextensionreviewed?: string
		gnext_applicanttype?: string
		gnext_publicsafetyofficeraddressline1?: string
		gnext_psonumberofchildrenattimeofinjury?: string
		gnext_dcretirementanddisabilityfinal?: string
		gnext_injurytypebulletsname?: number
		modifiedbyyominame?: string
		gnext_applicationreviewedtimelyname?: number
		gnext_officermedicallyretiredname?: number
		gnext_applicationstage?: string
		gnext_applicationsubmitted?: string
		gnext_hastheofficerreceivedanyformalvocationalo?: string
		gnext_applicanteditrequired?: string
		createdby?: string
		gnext_medicalquestionnairecompletedbyphysicianname?: number
		gnext_officerhadsurvivingparents?: string
		gnext_hasofficerreceivedvocationaltraining?: string
		gnext_applicationreviewedtimely?: string
		_gnext_claimantid_value?: string
		
    }
    /** @description Form Helper Class for gnext_application
     */ 
	export class gnext_applicationForm {
		public gnext_theapplicantwishestofileinthiscapacity: string = "gnext_theapplicantwishestofileinthiscapacity";
		public gnext_spouseaddress1: string = "gnext_spouseaddress1";
		public gnext_theapplicantwishestofileinthiscapacityname: string = "gnext_theapplicantwishestofileinthiscapacityname";
		public gnext_filingextensionresponsesent: string = "gnext_filingextensionresponsesent";
		public gnext_psohavechildren_wfsname: string = "gnext_psohavechildren_wfsname";
		public gnext_submitmyownmedicalrecordsname: string = "gnext_submitmyownmedicalrecordsname";
		public gnext_nationalfallenfirefightersfoundationname: string = "gnext_nationalfallenfirefightersfoundationname";
		public gnext_claimantrepresentationconfirmation: string = "gnext_claimantrepresentationconfirmation";
		public gnext_phone: string = "gnext_phone";
		public gnext_psohavechildrenname: string = "gnext_psohavechildrenname";
		public gnext_officerssn: string = "gnext_officerssn";
		public gnext_appfiledundermedicalretirementdisabilityname: string = "gnext_appfiledundermedicalretirementdisabilityname";
		public gnext_determinedworkerscompensationname: string = "gnext_determinedworkerscompensationname";
		public gnext_publicsafetyofficerphonenumber: string = "gnext_publicsafetyofficerphonenumber";
		public gnext_spousecity: string = "gnext_spousecity";
		public gnext_offworkedatanyjobs_fol_theinjname: string = "gnext_offworkedatanyjobs_fol_theinjname";
		public gnext_hasaclaimbeenfiledunder: string = "gnext_hasaclaimbeenfiledunder";
		public gnext_causeofinjuryname: string = "gnext_causeofinjuryname";
		public gnext_officermarriedtoanyoneelse: string = "gnext_officermarriedtoanyoneelse";
		public gnext_applicationassignedname: string = "gnext_applicationassignedname";
		public gnext_appfiledundersocialsecurityname: string = "gnext_appfiledundersocialsecurityname";
		public gnext_bypasspreapplicationname: string = "gnext_bypasspreapplicationname";
		public gnext_nameofemployingagency: string = "gnext_nameofemployingagency";
		public gnext_zip: string = "gnext_zip";
		public gnext_datesubmittedcalculated: string = "gnext_datesubmittedcalculated";
		public gnext_publicsafetyofficersmaritalstatusname: string = "gnext_publicsafetyofficersmaritalstatusname";
		public gnext_otherbenefitsfiledname: string = "gnext_otherbenefitsfiledname";
		public gnext_agencysubmissionstatusname: string = "gnext_agencysubmissionstatusname";
		public gnext_injurytypeelectricity: string = "gnext_injurytypeelectricity";
		public gnext_authorizedtorepresenttheofficer: string = "gnext_authorizedtorepresenttheofficer";
		public gnext_injuryrelatedtoeventsof20010911: string = "gnext_injuryrelatedtoeventsof20010911";
		public gnext_toxicologyanalysisname: string = "gnext_toxicologyanalysisname";
		public gnext_officerhaddesigneeorlifeinsbeneficiary: string = "gnext_officerhaddesigneeorlifeinsbeneficiary";
		public statecodename: string = "statecodename";
		public gnext_filedstatelineofdutydeathbenefitsname: string = "gnext_filedstatelineofdutydeathbenefitsname";
		public gnext_certificationofapplicationname: string = "gnext_certificationofapplicationname";
		public gnext_digitallysignname: string = "gnext_digitallysignname";
		public gnext_officerhadlifeinsurancedesignee: string = "gnext_officerhadlifeinsurancedesignee";
		public gnext_applicanttypename: string = "gnext_applicanttypename";
		public gnext_country: string = "gnext_country";
		public gnext_employingagencyheadcity: string = "gnext_employingagencyheadcity";
		public gnext_firstname: string = "gnext_firstname";
		public gnext_filedstatelineofdutydeathbenefits: string = "gnext_filedstatelineofdutydeathbenefits";
		public gnext_officermarriedtoanyoneelsename: string = "gnext_officermarriedtoanyoneelsename";
		public gnext_currentdatetime: string = "gnext_currentdatetime";
		public gnext_dutystatus: string = "gnext_dutystatus";
		public gnext_applicantrelationshiptothepsoname: string = "gnext_applicantrelationshiptothepsoname";
		public gnext_injuryrelatedtoeventsof20010911name: string = "gnext_injuryrelatedtoeventsof20010911name";
		public gnext_spousestatename: string = "gnext_spousestatename";
		public gnext_officermaritalstatus: string = "gnext_officermaritalstatus";
		public gnext_dcretirementanddisabilityactname: string = "gnext_dcretirementanddisabilityactname";
		public gnext_employingagencycity: string = "gnext_employingagencycity";
		public importsequencenumber: string = "importsequencenumber";
		public gnext_describeofficerworkingorvolunteering: string = "gnext_describeofficerworkingorvolunteering";
		public gnext_injurytypeheartattack: string = "gnext_injurytypeheartattack";
		public gnext_ifnotretiredexplain: string = "gnext_ifnotretiredexplain";
		public gnext_econdolencedraftedname: string = "gnext_econdolencedraftedname";
		public gnext_applicanteditrequiredname: string = "gnext_applicanteditrequiredname";
		public gnext_iscontactinformationforagencyheadthesame: string = "gnext_iscontactinformationforagencyheadthesame";
		public gnext_officerhavechildrenattimeofinjury: string = "gnext_officerhavechildrenattimeofinjury";
		public gnext_bypassapplication: string = "gnext_bypassapplication";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_concernsofpolicesurvivorsinc: string = "gnext_concernsofpolicesurvivorsinc";
		public gnext_spousetelephonenumnber: string = "gnext_spousetelephonenumnber";
		public gnext_numberofparents: string = "gnext_numberofparents";
		public gnext_applicationid: string = "gnext_applicationid";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public gnext_agencybeenauthorizedtorepresentname: string = "gnext_agencybeenauthorizedtorepresentname";
		public gnext_psohavechildren_wfs: string = "gnext_psohavechildren_wfs";
		public gnext_injurytypeclimaticconditionsname: string = "gnext_injurytypeclimaticconditionsname";
		public gnext_officerchildren_wfs: string = "gnext_officerchildren_wfs";
		public gnext_numberofotherbeneficiariesname: string = "gnext_numberofotherbeneficiariesname";
		public gnext_psoparentfirstname: string = "gnext_psoparentfirstname";
		public gnext_appfiledunderworkerscompensationname: string = "gnext_appfiledunderworkerscompensationname";
		public gnext_otherbenefitsfiled: string = "gnext_otherbenefitsfiled";
		public gnext_employingagencyline1: string = "gnext_employingagencyline1";
		public gnext_anyyoucannotprovidename: string = "gnext_anyyoucannotprovidename";
		public gnext_publicsafetyofficersmaritalstatus: string = "gnext_publicsafetyofficersmaritalstatus";
		public gnext_injurytypeclimaticconditions: string = "gnext_injurytypeclimaticconditions";
		public gnext_bypassapplicationdate: string = "gnext_bypassapplicationdate";
		public versionnumber: string = "versionnumber";
		public gnext_causeofinjuryother: string = "gnext_causeofinjuryother";
		public gnext_spousealternatephonenumber: string = "gnext_spousealternatephonenumber";
		public gnext_applicationstagename: string = "gnext_applicationstagename";
		public gnext_certifyinformationastrue: string = "gnext_certifyinformationastrue";
		public gnext_spousecountry: string = "gnext_spousecountry";
		public gnext_injurytypeinfectiousdiseasename: string = "gnext_injurytypeinfectiousdiseasename";
		public gnext_nationalfallenfirefightersfoundation_wfsname: string = "gnext_nationalfallenfirefightersfoundation_wfsname";
		public gnext_agencyservicejurisdictionname: string = "gnext_agencyservicejurisdictionname";
		public gnext_officermaritalstatusattimeofdeathname: string = "gnext_officermaritalstatusattimeofdeathname";
		public gnext_middlename: string = "gnext_middlename";
		public gnext_setapplicantnamename: string = "gnext_setapplicantnamename";
		public gnext_psohavechildren: string = "gnext_psohavechildren";
		public gnext_officersalternatephone: string = "gnext_officersalternatephone";
		public gnext_filingextensionreviewedname: string = "gnext_filingextensionreviewedname";
		public gnext_employingagencyheadgeneralphone: string = "gnext_employingagencyheadgeneralphone";
		public gnext_econdolencesentname: string = "gnext_econdolencesentname";
		public gnext_ifotherengagementtype: string = "gnext_ifotherengagementtype";
		public gnext_anyyoucannotprovide: string = "gnext_anyyoucannotprovide";
		public gnext_deteminationissuedsocialsecurity: string = "gnext_deteminationissuedsocialsecurity";
		public gnext_officermarriedattimeofinjury_wfsname: string = "gnext_officermarriedattimeofinjury_wfsname";
		public gnext_officerdateofdisability: string = "gnext_officerdateofdisability";
		public gnext_econdolencesent: string = "gnext_econdolencesent";
		public gnext_officercurrentlyworkingorvolunteering: string = "gnext_officercurrentlyworkingorvolunteering";
		public gnext_numberofchildrenname: string = "gnext_numberofchildrenname";
		public gnext_deteminationissuedmedicalretirementdisname: string = "gnext_deteminationissuedmedicalretirementdisname";
		public gnext_officermiddlename: string = "gnext_officermiddlename";
		public gnext_city: string = "gnext_city";
		public gnext_filedeathreport: string = "gnext_filedeathreport";
		public gnext_spouseaddress2: string = "gnext_spouseaddress2";
		public gnext_officerworkedotherplacespostinjury: string = "gnext_officerworkedotherplacespostinjury";
		public gnext_didthepsohavesurvivingadultchildrenname: string = "gnext_didthepsohavesurvivingadultchildrenname";
		public gnext_address1: string = "gnext_address1";
		public gnext_ifotheragencyclassification: string = "gnext_ifotheragencyclassification";
		public gnext_anyyoucannotprovideexplanation: string = "gnext_anyyoucannotprovideexplanation";
		public gnext_authorizeanothertoaccess: string = "gnext_authorizeanothertoaccess";
		public gnext_datesigned: string = "gnext_datesigned";
		public gnext_psoparentlastname: string = "gnext_psoparentlastname";
		public gnext_september11thvictimcompensationfund: string = "gnext_september11thvictimcompensationfund";
		public gnext_applicationvalidatedname: string = "gnext_applicationvalidatedname";
		public gnext_officerdateofmedicalretirement: string = "gnext_officerdateofmedicalretirement";
		public gnext_september11tvictimcompensationfundfinal: string = "gnext_september11tvictimcompensationfundfinal";
		public gnext_otherorganization: string = "gnext_otherorganization";
		public gnext_officerhadsurvivingparentsname: string = "gnext_officerhadsurvivingparentsname";
		public gnext_numberofadultchildren: string = "gnext_numberofadultchildren";
		public gnext_numberofotherbeneficiaries: string = "gnext_numberofotherbeneficiaries";
		public gnext_hasafinaldeterminationbeenissuedfor: string = "gnext_hasafinaldeterminationbeenissuedfor";
		public gnext_officerhadchildrenpreviousrelationshipname: string = "gnext_officerhadchildrenpreviousrelationshipname";
		public gnext_agencyrelationshiptopsoname: string = "gnext_agencyrelationshiptopsoname";
		public gnext_applicantsstatement1: string = "gnext_applicantsstatement1";
		public gnext_publicsafetyofficercountry: string = "gnext_publicsafetyofficercountry";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public gnext_injurytypestressorstrain: string = "gnext_injurytypestressorstrain";
		public gnext_agencyservicejurisdiction: string = "gnext_agencyservicejurisdiction";
		public gnext_claimantrepresentationconfirmationname: string = "gnext_claimantrepresentationconfirmationname";
		public gnext_medicalretirementdate: string = "gnext_medicalretirementdate";
		public gnext_filedeathreportname: string = "gnext_filedeathreportname";
		public gnext_state: string = "gnext_state";
		public gnext_injurytypeviralinfectionname: string = "gnext_injurytypeviralinfectionname";
		public gnext_officeremployedinnonciviliancapacity: string = "gnext_officeremployedinnonciviliancapacity";
		public gnext_attorneyforspouse: string = "gnext_attorneyforspouse";
		public gnext_lastname: string = "gnext_lastname";
		public gnext_applicationassigned: string = "gnext_applicationassigned";
		public gnext_typeofauthorizedrepresentative: string = "gnext_typeofauthorizedrepresentative";
		public gnext_determinedworkerscompensation: string = "gnext_determinedworkerscompensation";
		public ownerid: string = "ownerid";
		public gnext_prefixortitle: string = "gnext_prefixortitle";
		public owneridname: string = "owneridname";
		public gnext_certificationofapplication: string = "gnext_certificationofapplication";
		public gnext_indicationofvoluntaryintoxication: string = "gnext_indicationofvoluntaryintoxication";
		public gnext_officerengagementattimeofinjury: string = "gnext_officerengagementattimeofinjury";
		public gnext_nootherbenefitsfiledname: string = "gnext_nootherbenefitsfiledname";
		public gnext_injurytypestrokename: string = "gnext_injurytypestrokename";
		public gnext_officermaritalstatusattimeofdeath: string = "gnext_officermaritalstatusattimeofdeath";
		public gnext_officerdateofdeath: string = "gnext_officerdateofdeath";
		public gnext_createpsorecordname: string = "gnext_createpsorecordname";
		public gnext_injurytypevehicleboatairplanehelicopter: string = "gnext_injurytypevehicleboatairplanehelicopter";
		public gnext_certifyinformationastruename: string = "gnext_certifyinformationastruename";
		public gnext_anyindicationofgrossnegligencename: string = "gnext_anyindicationofgrossnegligencename";
		public gnext_applicationreceivedname: string = "gnext_applicationreceivedname";
		public traversedpath: string = "traversedpath";
		public gnext_otherclaimsfiled: string = "gnext_otherclaimsfiled";
		public gnext_officeremployedinnonciviliancapacityname: string = "gnext_officeremployedinnonciviliancapacityname";
		public gnext_injurytypeother: string = "gnext_injurytypeother";
		public gnext_applicationsubmittedname: string = "gnext_applicationsubmittedname";
		public gnext_filingextensionreceivedname: string = "gnext_filingextensionreceivedname";
		public gnext_publicsafetyofficerstate: string = "gnext_publicsafetyofficerstate";
		public gnext_publicsafetyofficerpriormarriagesname: string = "gnext_publicsafetyofficerpriormarriagesname";
		public gnext_injurytypeexplosives: string = "gnext_injurytypeexplosives";
		public gnext_dutystatusname: string = "gnext_dutystatusname";
		public gnext_psoparentstate: string = "gnext_psoparentstate";
		public gnext_agencybeenauthorizedtorepresent: string = "gnext_agencybeenauthorizedtorepresent";
		public gnext_ifyouknoworiginalclaimnumberpleaselist: string = "gnext_ifyouknoworiginalclaimnumberpleaselist";
		public gnext_publicsafetyofficeralternatephonenumber: string = "gnext_publicsafetyofficeralternatephonenumber";
		public gnext_injurytypevehicleboatairplanehelicoptername: string = "gnext_injurytypevehicleboatairplanehelicoptername";
		public gnext_psoparentstatename: string = "gnext_psoparentstatename";
		public gnext_injurytypephysicalblows: string = "gnext_injurytypephysicalblows";
		public gnext_determinedstatelineofdutydeathbenefits: string = "gnext_determinedstatelineofdutydeathbenefits";
		public gnext_authorizeanothertoaccessname: string = "gnext_authorizeanothertoaccessname";
		public gnext_september11tvictimcompensationfundfinalname: string = "gnext_september11tvictimcompensationfundfinalname";
		public gnext_nootherbenefitsdeterminedname: string = "gnext_nootherbenefitsdeterminedname";
		public gnext_claimantidyominame: string = "gnext_claimantidyominame";
		public gnext_officerfirstname: string = "gnext_officerfirstname";
		public gnext_econdolencedrafted: string = "gnext_econdolencedrafted";
		public gnext_appfiledundersocialsecurity: string = "gnext_appfiledundersocialsecurity";
		public gnext_lastchildentityupdateddate: string = "gnext_lastchildentityupdateddate";
		public gnext_september11thvictimcompensationfundname: string = "gnext_september11thvictimcompensationfundname";
		public gnext_applicationreceived: string = "gnext_applicationreceived";
		public gnext_injurytypeelectricityname: string = "gnext_injurytypeelectricityname";
		public gnext_numberofchildren: string = "gnext_numberofchildren";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_nameofminorchildsparentorlegalguardian: string = "gnext_nameofminorchildsparentorlegalguardian";
		public gnext_officercurrentlyworkingorvolunteeringname: string = "gnext_officercurrentlyworkingorvolunteeringname";
		public gnext_psoid: string = "gnext_psoid";
		public gnext_nootherbenefitsdetermined: string = "gnext_nootherbenefitsdetermined";
		public gnext_publicsafetyofficerpriormarriages_wfs: string = "gnext_publicsafetyofficerpriormarriages_wfs";
		public gnext_injurytyperadiation: string = "gnext_injurytyperadiation";
		public gnext_attorneyforspouseyominame: string = "gnext_attorneyforspouseyominame";
		public gnext_didthepsohavesurvivingadultchildren: string = "gnext_didthepsohavesurvivingadultchildren";
		public gnext_noncivilianmilitarycapacityexplanation: string = "gnext_noncivilianmilitarycapacityexplanation";
		public gnext_numberofadultchildrenname: string = "gnext_numberofadultchildrenname";
		public gnext_bypasspreapplication: string = "gnext_bypasspreapplication";
		public gnext_specifyothertypeofauthrep: string = "gnext_specifyothertypeofauthrep";
		public gnext_applicationreferenceidentifier: string = "gnext_applicationreferenceidentifier";
		public gnext_federalemployeescompensationactfinalname: string = "gnext_federalemployeescompensationactfinalname";
		public gnext_officerengagementattimeofinjuryname: string = "gnext_officerengagementattimeofinjuryname";
		public gnext_officerhaddesigneeorlifeinsbeneficiaryname: string = "gnext_officerhaddesigneeorlifeinsbeneficiaryname";
		public gnext_employingagencyheadcountry: string = "gnext_employingagencyheadcountry";
		public gnext_publicsafetyofficerpriormarriages_wfsname: string = "gnext_publicsafetyofficerpriormarriages_wfsname";
		public createdon: string = "createdon";
		public gnext_psoparenttelephone: string = "gnext_psoparenttelephone";
		public gnext_hasafinaldeterminationbeenissuedforname: string = "gnext_hasafinaldeterminationbeenissuedforname";
		public gnext_agencyrelationshiptopso: string = "gnext_agencyrelationshiptopso";
		public gnext_publicsafetyofficerstatename: string = "gnext_publicsafetyofficerstatename";
		public gnext_unvalidateddocs: string = "gnext_unvalidateddocs";
		public gnext_agencyclassification: string = "gnext_agencyclassification";
		public gnext_applicationtype: string = "gnext_applicationtype";
		public gnext_needsadditionalrequireddocumentsname: string = "gnext_needsadditionalrequireddocumentsname";
		public gnext_employingagencystate: string = "gnext_employingagencystate";
		public gnext_numberofparentsname: string = "gnext_numberofparentsname";
		public gnext_numberoflifeinsurancedesignees: string = "gnext_numberoflifeinsurancedesignees";
		public gnext_numberofdesignees: string = "gnext_numberofdesignees";
		public gnext_officerchildren_wfsname: string = "gnext_officerchildren_wfsname";
		public gnext_numberoftimespsowasmarried: string = "gnext_numberoftimespsowasmarried";
		public gnext_publicsafetyofficeraddressline2: string = "gnext_publicsafetyofficeraddressline2";
		public gnext_officermarriedattimeofinjury_wfs: string = "gnext_officermarriedattimeofinjury_wfs";
		public gnext_notification1: string = "gnext_notification1";
		public gnext_notification2: string = "gnext_notification2";
		public gnext_notification3: string = "gnext_notification3";
		public gnext_officerhadlifeinsurancedesigneename: string = "gnext_officerhadlifeinsurancedesigneename";
		public gnext_concernsofpolicesurvivorsinc_wfsname: string = "gnext_concernsofpolicesurvivorsinc_wfsname";
		public gnext_undergoindependentmedicalexpertreview: string = "gnext_undergoindependentmedicalexpertreview";
		public gnext_employingagencyheadstate: string = "gnext_employingagencyheadstate";
		public gnext_psoparentzipcode: string = "gnext_psoparentzipcode";
		public gnext_appholderidname: string = "gnext_appholderidname";
		public gnext_address2: string = "gnext_address2";
		public gnext_spousezipcode: string = "gnext_spousezipcode";
		public gnext_employingagencycountry: string = "gnext_employingagencycountry";
		public gnext_injurytypevascularrupturename: string = "gnext_injurytypevascularrupturename";
		public gnext_whatisthehighesteducationalleveltheoffice: string = "gnext_whatisthehighesteducationalleveltheoffice";
		public gnext_officertitle: string = "gnext_officertitle";
		public gnext_authorizedtorepresentactingonbehalfofname: string = "gnext_authorizedtorepresentactingonbehalfofname";
		public gnext_anyindicationofgrossnegligence: string = "gnext_anyindicationofgrossnegligence";
		public gnext_appholderid: string = "gnext_appholderid";
		public statecode: string = "statecode";
		public statuscode: string = "statuscode";
		public gnext_officersphonenumber: string = "gnext_officersphonenumber";
		public gnext_officermedicallyretired: string = "gnext_officermedicallyretired";
		public gnext_applicantsstatement2: string = "gnext_applicantsstatement2";
		public gnext_nameofindividualyourepresent: string = "gnext_nameofindividualyourepresent";
		public gnext_officermarriedattimeofinjury: string = "gnext_officermarriedattimeofinjury";
		public gnext_employingagencyheadfirstname: string = "gnext_employingagencyheadfirstname";
		public gnext_applicantrelationship: string = "gnext_applicantrelationship";
		public gnext_officermaritalstatusname: string = "gnext_officermaritalstatusname";
		public gnext_officerchildren: string = "gnext_officerchildren";
		public gnext_relationshiptopsoname: string = "gnext_relationshiptopsoname";
		public gnext_otherbenefitsdetermined: string = "gnext_otherbenefitsdetermined";
		public gnext_setapplicantname: string = "gnext_setapplicantname";
		public gnext_concernsofpolicesurvivorsinc_wfs: string = "gnext_concernsofpolicesurvivorsinc_wfs";
		public gnext_areyouauthorizedtorepresentthispersonname: string = "gnext_areyouauthorizedtorepresentthispersonname";
		public gnext_employingagencyzip: string = "gnext_employingagencyzip";
		public gnext_injurytypeviralinfection: string = "gnext_injurytypeviralinfection";
		public gnext_employingagencyheadaddressline1: string = "gnext_employingagencyheadaddressline1";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_concernsofpolicesurvivorsincname: string = "gnext_concernsofpolicesurvivorsincname";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public gnext_otherstate: string = "gnext_otherstate";
		public gnext_indicationofowndisabilityorinjuryname: string = "gnext_indicationofowndisabilityorinjuryname";
		public gnext_designateanauthorizedrepresentative: string = "gnext_designateanauthorizedrepresentative";
		public gnext_relationshiptopso: string = "gnext_relationshiptopso";
		public owninguser: string = "owninguser";
		public gnext_dutystatusdescribe: string = "gnext_dutystatusdescribe";
		public gnext_signingasauthorizedrepname: string = "gnext_signingasauthorizedrepname";
		public gnext_injurytypevascularrupture: string = "gnext_injurytypevascularrupture";
		public gnext_officerdateofbirth: string = "gnext_officerdateofbirth";
		public gnext_injurytypesharpinstrumentsbluntobjectsname: string = "gnext_injurytypesharpinstrumentsbluntobjectsname";
		public gnext_datereceived: string = "gnext_datereceived";
		public gnext_injurytypestroke: string = "gnext_injurytypestroke";
		public gnext_describetypeofauthorizedrepresentativeoth: string = "gnext_describetypeofauthorizedrepresentativeoth";
		public gnext_injurytyperadiationname: string = "gnext_injurytyperadiationname";
		public gnext_unvalidateddocsname: string = "gnext_unvalidateddocsname";
		public gnext_needsadditionalrequireddocuments: string = "gnext_needsadditionalrequireddocuments";
		public gnext_deteminationissuedworkerscompensationname: string = "gnext_deteminationissuedworkerscompensationname";
		public gnext_employingagencyline2: string = "gnext_employingagencyline2";
		public gnext_deteminationissuedmedicalretirementdis: string = "gnext_deteminationissuedmedicalretirementdis";
		public gnext_intentionalmisconductexplanation: string = "gnext_intentionalmisconductexplanation";
		public gnext_officerdateofincident: string = "gnext_officerdateofincident";
		public gnext_officerchildrenname: string = "gnext_officerchildrenname";
		public gnext_iscontactinformationforagencyheadthesamename: string = "gnext_iscontactinformationforagencyheadthesamename";
		public gnext_applicationonholdname: string = "gnext_applicationonholdname";
		public gnext_hasaclaimbeenfiledundername: string = "gnext_hasaclaimbeenfiledundername";
		public gnext_injurytypeoccupationaldisease: string = "gnext_injurytypeoccupationaldisease";
		public gnext_spousestate: string = "gnext_spousestate";
		public gnext_name: string = "gnext_name";
		public gnext_federalemployeescompensationact: string = "gnext_federalemployeescompensationact";
		public gnext_describeotherprefix: string = "gnext_describeotherprefix";
		public gnext_numberoflifeinsurancedesigneesname: string = "gnext_numberoflifeinsurancedesigneesname";
		public gnext_representingapplicantname: string = "gnext_representingapplicantname";
		public gnext_employingagencyheadaddressline2: string = "gnext_employingagencyheadaddressline2";
		public gnext_injurytypeexplosivesname: string = "gnext_injurytypeexplosivesname";
		public gnext_injurytypeothername: string = "gnext_injurytypeothername";
		public gnext_designateanauthorizedrepresentativename: string = "gnext_designateanauthorizedrepresentativename";
		public gnext_agencysubmissionstatus: string = "gnext_agencysubmissionstatus";
		public gnext_agencyclassificationname: string = "gnext_agencyclassificationname";
		public gnext_spouselastname: string = "gnext_spouselastname";
		public gnext_officermarriedattimeofinjuryname: string = "gnext_officermarriedattimeofinjuryname";
		public owneridtype: string = "owneridtype";
		public gnext_spouseemail: string = "gnext_spouseemail";
		public gnext_attorneyforspousename: string = "gnext_attorneyforspousename";
		public gnext_nationalfallenfirefightersfoundation: string = "gnext_nationalfallenfirefightersfoundation";
		public gnext_describeotherdetermination: string = "gnext_describeotherdetermination";
		public gnext_injurytypephysicalblowsname: string = "gnext_injurytypephysicalblowsname";
		public gnext_injurytypesharpinstrumentsbluntobjects: string = "gnext_injurytypesharpinstrumentsbluntobjects";
		public gnext_psosuffix: string = "gnext_psosuffix";
		public gnext_publicsafetyofficerpriormarriages: string = "gnext_publicsafetyofficerpriormarriages";
		public gnext_injurytypefiresmokeinhalation: string = "gnext_injurytypefiresmokeinhalation";
		public gnext_applicantsstatement3: string = "gnext_applicantsstatement3";
		public gnext_signingasauthorizedrep: string = "gnext_signingasauthorizedrep";
		public gnext_federalemployeescompensationactname: string = "gnext_federalemployeescompensationactname";
		public gnext_representingapplicant: string = "gnext_representingapplicant";
		public createdbyyominame: string = "createdbyyominame";
		public gnext_federalemployeescompensationactfinal: string = "gnext_federalemployeescompensationactfinal";
		public gnext_officerhavechildrenattimeofinjuryname: string = "gnext_officerhavechildrenattimeofinjuryname";
		public gnext_prefixortitlename: string = "gnext_prefixortitlename";
		public gnext_employingagencyheadlastname: string = "gnext_employingagencyheadlastname";
		public gnext_survivingspousedateofmarriagetopso: string = "gnext_survivingspousedateofmarriagetopso";
		public gnext_deteminationissuedsocialsecurityname: string = "gnext_deteminationissuedsocialsecurityname";
		public gnext_causeofinjury: string = "gnext_causeofinjury";
		public gnext_submitmyownmedicalrecords: string = "gnext_submitmyownmedicalrecords";
		public gnext_submittedname: string = "gnext_submittedname";
		public gnext_filingextensionresponsesentname: string = "gnext_filingextensionresponsesentname";
		public gnext_appfiledundermedicalretirementdisability: string = "gnext_appfiledundermedicalretirementdisability";
		public gnext_spousemiddlename: string = "gnext_spousemiddlename";
		public createdbyname: string = "createdbyname";
		public gnext_deteminationissuedworkerscompensation: string = "gnext_deteminationissuedworkerscompensation";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public owningteam: string = "owningteam";
		public gnext_applicationvalidated: string = "gnext_applicationvalidated";
		public gnext_applicationonhold: string = "gnext_applicationonhold";
		public gnext_injurytypeheartattackname: string = "gnext_injurytypeheartattackname";
		public gnext_officerlastname: string = "gnext_officerlastname";
		public gnext_authorizedtorepresentactingonbehalfof: string = "gnext_authorizedtorepresentactingonbehalfof";
		public gnext_injurytypeinfectiousdisease: string = "gnext_injurytypeinfectiousdisease";
		public gnext_numberoftimespsowasmarriedname: string = "gnext_numberoftimespsowasmarriedname";
		public gnext_bypassapplicationname: string = "gnext_bypassapplicationname";
		public gnext_describeotherfiled: string = "gnext_describeotherfiled";
		public gnext_createpsorecord: string = "gnext_createpsorecord";
		public gnext_typeofauthorizedrepresentativename: string = "gnext_typeofauthorizedrepresentativename";
		public gnext_employingagencyheadstatename: string = "gnext_employingagencyheadstatename";
		public gnext_areyouauthorizedtorepresentthisperson: string = "gnext_areyouauthorizedtorepresentthisperson";
		public gnext_injurytypestressorstrainname: string = "gnext_injurytypestressorstrainname";
		public gnext_psoparentmiddlename: string = "gnext_psoparentmiddlename";
		public gnext_otherclaimsfiledname: string = "gnext_otherclaimsfiledname";
		public gnext_ifotherspecifyrelationship: string = "gnext_ifotherspecifyrelationship";
		public gnext_employingagencyheadalternatelphone: string = "gnext_employingagencyheadalternatelphone";
		public gnext_injurytypeoccupationaldiseasename: string = "gnext_injurytypeoccupationaldiseasename";
		public gnext_claimnumberassigned: string = "gnext_claimnumberassigned";
		public gnext_spousefirstname: string = "gnext_spousefirstname";
		public stageid: string = "stageid";
		public gnext_indicationofowndisabilityorinjury: string = "gnext_indicationofowndisabilityorinjury";
		public gnext_employingagencyheademailaddress: string = "gnext_employingagencyheademailaddress";
		public gnext_publicsafetyofficerzip: string = "gnext_publicsafetyofficerzip";
		public modifiedbyname: string = "modifiedbyname";
		public gnext_authorizedreporapplicantsignature: string = "gnext_authorizedreporapplicantsignature";
		public gnext_dcretirementanddisabilityact: string = "gnext_dcretirementanddisabilityact";
		public gnext_psonumberofchildrenattimeofinjuryname: string = "gnext_psonumberofchildrenattimeofinjuryname";
		public gnext_owninjuryintentexplanation: string = "gnext_owninjuryintentexplanation";
		public gnext_indicationofmisconduct: string = "gnext_indicationofmisconduct";
		public gnext_psoparentcountry: string = "gnext_psoparentcountry";
		public gnext_employingagencystatename: string = "gnext_employingagencystatename";
		public gnext_appfiledunderworkerscompensation: string = "gnext_appfiledunderworkerscompensation";
		public gnext_numberofdesigneesname: string = "gnext_numberofdesigneesname";
		public gnext_psorecordcreated: string = "gnext_psorecordcreated";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public modifiedby: string = "modifiedby";
		public gnext_offworkedatanyjobs_fol_theinj: string = "gnext_offworkedatanyjobs_fol_theinj";
		public owneridyominame: string = "owneridyominame";
		public gnext_employingagencyheadzip: string = "gnext_employingagencyheadzip";
		public gnext_claimid: string = "gnext_claimid";
		public gnext_authorizedtorepresenttheofficername: string = "gnext_authorizedtorepresenttheofficername";
		public gnext_claimidname: string = "gnext_claimidname";
		public gnext_filingextensionreceived: string = "gnext_filingextensionreceived";
		public gnext_grossnegligenceexplanation: string = "gnext_grossnegligenceexplanation";
		public gnext_injurytypechemicals: string = "gnext_injurytypechemicals";
		public gnext_applicationtypename: string = "gnext_applicationtypename";
		public gnext_submitted: string = "gnext_submitted";
		public gnext_digitallysign: string = "gnext_digitallysign";
		public gnext_toxicologyanalysis: string = "gnext_toxicologyanalysis";
		public gnext_undergoindependentmedicalexpertreviewname: string = "gnext_undergoindependentmedicalexpertreviewname";
		public overriddencreatedon: string = "overriddencreatedon";
		public gnext_applicantrelationshipname: string = "gnext_applicantrelationshipname";
		public gnext_psoidname: string = "gnext_psoidname";
		public gnext_determinedstatelineofdutydeathbenefitsname: string = "gnext_determinedstatelineofdutydeathbenefitsname";
		public gnext_otherbenefitsdeterminedname: string = "gnext_otherbenefitsdeterminedname";
		public gnext_officerhadchildrenpreviousrelationship: string = "gnext_officerhadchildrenpreviousrelationship";
		public gnext_injurytypefiresmokeinhalationname: string = "gnext_injurytypefiresmokeinhalationname";
		public gnext_bypasspreapplicationdate: string = "gnext_bypasspreapplicationdate";
		public gnext_injurytypechemicalsname: string = "gnext_injurytypechemicalsname";
		public gnext_psorecordcreatedname: string = "gnext_psorecordcreatedname";
		public gnext_statename: string = "gnext_statename";
		public gnext_nootherbenefitsfiled: string = "gnext_nootherbenefitsfiled";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public gnext_indicationofvoluntaryintoxicationname: string = "gnext_indicationofvoluntaryintoxicationname";
		public gnext_publicsafetyofficercity: string = "gnext_publicsafetyofficercity";
		public gnext_psoparentaddress2: string = "gnext_psoparentaddress2";
		public gnext_numberoftimesmarried: string = "gnext_numberoftimesmarried";
		public gnext_psoparentaddress1: string = "gnext_psoparentaddress1";
		public gnext_requireddocumentsuploadedorjustified: string = "gnext_requireddocumentsuploadedorjustified";
		public gnext_publicsafetyofficerdateofmedicalretiremen: string = "gnext_publicsafetyofficerdateofmedicalretiremen";
		public gnext_claimantidname: string = "gnext_claimantidname";
		public gnext_applicantrelationshiptothepso: string = "gnext_applicantrelationshiptothepso";
		public gnext_nationalfallenfirefightersfoundation_wfs: string = "gnext_nationalfallenfirefightersfoundation_wfs";
		public gnext_employingagencyheadtitle: string = "gnext_employingagencyheadtitle";
		public gnext_indicationofmisconductname: string = "gnext_indicationofmisconductname";
		public gnext_psoparentcity: string = "gnext_psoparentcity";
		public gnext_numberoftimesmarriedname: string = "gnext_numberoftimesmarriedname";
		public gnext_medicalquestionnairecompletedbyphysician: string = "gnext_medicalquestionnairecompletedbyphysician";
		public gnext_dcretirementanddisabilityfinalname: string = "gnext_dcretirementanddisabilityfinalname";
		public statuscodename: string = "statuscodename";
		public gnext_injurytypebullets: string = "gnext_injurytypebullets";
		public gnext_publicsafetyofficeremailaddress: string = "gnext_publicsafetyofficeremailaddress";
		public processid: string = "processid";
		public modifiedon: string = "modifiedon";
		public gnext_hasofficerreceivedvocationaltrainingname: string = "gnext_hasofficerreceivedvocationaltrainingname";
		public gnext_filingextensionreviewed: string = "gnext_filingextensionreviewed";
		public gnext_applicanttype: string = "gnext_applicanttype";
		public gnext_publicsafetyofficeraddressline1: string = "gnext_publicsafetyofficeraddressline1";
		public gnext_psonumberofchildrenattimeofinjury: string = "gnext_psonumberofchildrenattimeofinjury";
		public gnext_dcretirementanddisabilityfinal: string = "gnext_dcretirementanddisabilityfinal";
		public gnext_injurytypebulletsname: string = "gnext_injurytypebulletsname";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public gnext_applicationreviewedtimelyname: string = "gnext_applicationreviewedtimelyname";
		public gnext_officermedicallyretiredname: string = "gnext_officermedicallyretiredname";
		public gnext_applicationstage: string = "gnext_applicationstage";
		public gnext_applicationsubmitted: string = "gnext_applicationsubmitted";
		public gnext_hastheofficerreceivedanyformalvocationalo: string = "gnext_hastheofficerreceivedanyformalvocationalo";
		public gnext_applicanteditrequired: string = "gnext_applicanteditrequired";
		public createdby: string = "createdby";
		public gnext_medicalquestionnairecompletedbyphysicianname: string = "gnext_medicalquestionnairecompletedbyphysicianname";
		public gnext_officerhadsurvivingparents: string = "gnext_officerhadsurvivingparents";
		public gnext_hasofficerreceivedvocationaltraining: string = "gnext_hasofficerreceivedvocationaltraining";
		public gnext_applicationreviewedtimely: string = "gnext_applicationreviewedtimely";
		public gnext_claimantid: string = "gnext_claimantid";
		
	}
    /** @description Web API attribute string helper class for gnext_application
     */ 
    export class gnext_applicationWebAPI {
        public gnext_theapplicantwishestofileinthiscapacity: string = "gnext_theapplicantwishestofileinthiscapacity";
		public gnext_spouseaddress1: string = "gnext_spouseaddress1";
		public gnext_theapplicantwishestofileinthiscapacityname: string = "gnext_theapplicantwishestofileinthiscapacityname";
		public gnext_filingextensionresponsesent: string = "gnext_filingextensionresponsesent";
		public gnext_psohavechildren_wfsname: string = "gnext_psohavechildren_wfsname";
		public gnext_submitmyownmedicalrecordsname: string = "gnext_submitmyownmedicalrecordsname";
		public gnext_nationalfallenfirefightersfoundationname: string = "gnext_nationalfallenfirefightersfoundationname";
		public gnext_claimantrepresentationconfirmation: string = "gnext_claimantrepresentationconfirmation";
		public gnext_phone: string = "gnext_phone";
		public gnext_psohavechildrenname: string = "gnext_psohavechildrenname";
		public gnext_officerssn: string = "gnext_officerssn";
		public gnext_appfiledundermedicalretirementdisabilityname: string = "gnext_appfiledundermedicalretirementdisabilityname";
		public gnext_determinedworkerscompensationname: string = "gnext_determinedworkerscompensationname";
		public gnext_publicsafetyofficerphonenumber: string = "gnext_publicsafetyofficerphonenumber";
		public gnext_spousecity: string = "gnext_spousecity";
		public gnext_offworkedatanyjobs_fol_theinjname: string = "gnext_offworkedatanyjobs_fol_theinjname";
		public gnext_hasaclaimbeenfiledunder: string = "gnext_hasaclaimbeenfiledunder";
		public gnext_causeofinjuryname: string = "gnext_causeofinjuryname";
		public gnext_officermarriedtoanyoneelse: string = "gnext_officermarriedtoanyoneelse";
		public gnext_applicationassignedname: string = "gnext_applicationassignedname";
		public gnext_appfiledundersocialsecurityname: string = "gnext_appfiledundersocialsecurityname";
		public gnext_bypasspreapplicationname: string = "gnext_bypasspreapplicationname";
		public gnext_nameofemployingagency: string = "gnext_nameofemployingagency";
		public gnext_zip: string = "gnext_zip";
		public gnext_datesubmittedcalculated: string = "gnext_datesubmittedcalculated";
		public gnext_publicsafetyofficersmaritalstatusname: string = "gnext_publicsafetyofficersmaritalstatusname";
		public gnext_otherbenefitsfiledname: string = "gnext_otherbenefitsfiledname";
		public gnext_agencysubmissionstatusname: string = "gnext_agencysubmissionstatusname";
		public gnext_injurytypeelectricity: string = "gnext_injurytypeelectricity";
		public gnext_authorizedtorepresenttheofficer: string = "gnext_authorizedtorepresenttheofficer";
		public gnext_injuryrelatedtoeventsof20010911: string = "gnext_injuryrelatedtoeventsof20010911";
		public gnext_toxicologyanalysisname: string = "gnext_toxicologyanalysisname";
		public gnext_officerhaddesigneeorlifeinsbeneficiary: string = "gnext_officerhaddesigneeorlifeinsbeneficiary";
		public statecodename: string = "statecodename";
		public gnext_filedstatelineofdutydeathbenefitsname: string = "gnext_filedstatelineofdutydeathbenefitsname";
		public gnext_certificationofapplicationname: string = "gnext_certificationofapplicationname";
		public gnext_digitallysignname: string = "gnext_digitallysignname";
		public gnext_officerhadlifeinsurancedesignee: string = "gnext_officerhadlifeinsurancedesignee";
		public gnext_applicanttypename: string = "gnext_applicanttypename";
		public gnext_country: string = "gnext_country";
		public gnext_employingagencyheadcity: string = "gnext_employingagencyheadcity";
		public gnext_firstname: string = "gnext_firstname";
		public gnext_filedstatelineofdutydeathbenefits: string = "gnext_filedstatelineofdutydeathbenefits";
		public gnext_officermarriedtoanyoneelsename: string = "gnext_officermarriedtoanyoneelsename";
		public gnext_currentdatetime: string = "gnext_currentdatetime";
		public gnext_dutystatus: string = "gnext_dutystatus";
		public gnext_applicantrelationshiptothepsoname: string = "gnext_applicantrelationshiptothepsoname";
		public gnext_injuryrelatedtoeventsof20010911name: string = "gnext_injuryrelatedtoeventsof20010911name";
		public gnext_spousestatename: string = "gnext_spousestatename";
		public gnext_officermaritalstatus: string = "gnext_officermaritalstatus";
		public gnext_dcretirementanddisabilityactname: string = "gnext_dcretirementanddisabilityactname";
		public gnext_employingagencycity: string = "gnext_employingagencycity";
		public importsequencenumber: string = "importsequencenumber";
		public gnext_describeofficerworkingorvolunteering: string = "gnext_describeofficerworkingorvolunteering";
		public gnext_injurytypeheartattack: string = "gnext_injurytypeheartattack";
		public gnext_ifnotretiredexplain: string = "gnext_ifnotretiredexplain";
		public gnext_econdolencedraftedname: string = "gnext_econdolencedraftedname";
		public gnext_applicanteditrequiredname: string = "gnext_applicanteditrequiredname";
		public gnext_iscontactinformationforagencyheadthesame: string = "gnext_iscontactinformationforagencyheadthesame";
		public gnext_officerhavechildrenattimeofinjury: string = "gnext_officerhavechildrenattimeofinjury";
		public gnext_bypassapplication: string = "gnext_bypassapplication";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_concernsofpolicesurvivorsinc: string = "gnext_concernsofpolicesurvivorsinc";
		public gnext_spousetelephonenumnber: string = "gnext_spousetelephonenumnber";
		public gnext_numberofparents: string = "gnext_numberofparents";
		public gnext_applicationid: string = "gnext_applicationid";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public gnext_agencybeenauthorizedtorepresentname: string = "gnext_agencybeenauthorizedtorepresentname";
		public gnext_psohavechildren_wfs: string = "gnext_psohavechildren_wfs";
		public gnext_injurytypeclimaticconditionsname: string = "gnext_injurytypeclimaticconditionsname";
		public gnext_officerchildren_wfs: string = "gnext_officerchildren_wfs";
		public gnext_numberofotherbeneficiariesname: string = "gnext_numberofotherbeneficiariesname";
		public gnext_psoparentfirstname: string = "gnext_psoparentfirstname";
		public gnext_appfiledunderworkerscompensationname: string = "gnext_appfiledunderworkerscompensationname";
		public gnext_otherbenefitsfiled: string = "gnext_otherbenefitsfiled";
		public gnext_employingagencyline1: string = "gnext_employingagencyline1";
		public gnext_anyyoucannotprovidename: string = "gnext_anyyoucannotprovidename";
		public gnext_publicsafetyofficersmaritalstatus: string = "gnext_publicsafetyofficersmaritalstatus";
		public gnext_injurytypeclimaticconditions: string = "gnext_injurytypeclimaticconditions";
		public gnext_bypassapplicationdate: string = "gnext_bypassapplicationdate";
		public versionnumber: string = "versionnumber";
		public gnext_causeofinjuryother: string = "gnext_causeofinjuryother";
		public gnext_spousealternatephonenumber: string = "gnext_spousealternatephonenumber";
		public gnext_applicationstagename: string = "gnext_applicationstagename";
		public gnext_certifyinformationastrue: string = "gnext_certifyinformationastrue";
		public gnext_spousecountry: string = "gnext_spousecountry";
		public gnext_injurytypeinfectiousdiseasename: string = "gnext_injurytypeinfectiousdiseasename";
		public gnext_nationalfallenfirefightersfoundation_wfsname: string = "gnext_nationalfallenfirefightersfoundation_wfsname";
		public gnext_agencyservicejurisdictionname: string = "gnext_agencyservicejurisdictionname";
		public gnext_officermaritalstatusattimeofdeathname: string = "gnext_officermaritalstatusattimeofdeathname";
		public gnext_middlename: string = "gnext_middlename";
		public gnext_setapplicantnamename: string = "gnext_setapplicantnamename";
		public gnext_psohavechildren: string = "gnext_psohavechildren";
		public gnext_officersalternatephone: string = "gnext_officersalternatephone";
		public gnext_filingextensionreviewedname: string = "gnext_filingextensionreviewedname";
		public gnext_employingagencyheadgeneralphone: string = "gnext_employingagencyheadgeneralphone";
		public gnext_econdolencesentname: string = "gnext_econdolencesentname";
		public gnext_ifotherengagementtype: string = "gnext_ifotherengagementtype";
		public gnext_anyyoucannotprovide: string = "gnext_anyyoucannotprovide";
		public gnext_deteminationissuedsocialsecurity: string = "gnext_deteminationissuedsocialsecurity";
		public gnext_officermarriedattimeofinjury_wfsname: string = "gnext_officermarriedattimeofinjury_wfsname";
		public gnext_officerdateofdisability: string = "gnext_officerdateofdisability";
		public gnext_econdolencesent: string = "gnext_econdolencesent";
		public gnext_officercurrentlyworkingorvolunteering: string = "gnext_officercurrentlyworkingorvolunteering";
		public gnext_numberofchildrenname: string = "gnext_numberofchildrenname";
		public gnext_deteminationissuedmedicalretirementdisname: string = "gnext_deteminationissuedmedicalretirementdisname";
		public gnext_officermiddlename: string = "gnext_officermiddlename";
		public gnext_city: string = "gnext_city";
		public gnext_filedeathreport: string = "gnext_filedeathreport";
		public gnext_spouseaddress2: string = "gnext_spouseaddress2";
		public gnext_officerworkedotherplacespostinjury: string = "gnext_officerworkedotherplacespostinjury";
		public gnext_didthepsohavesurvivingadultchildrenname: string = "gnext_didthepsohavesurvivingadultchildrenname";
		public gnext_address1: string = "gnext_address1";
		public gnext_ifotheragencyclassification: string = "gnext_ifotheragencyclassification";
		public gnext_anyyoucannotprovideexplanation: string = "gnext_anyyoucannotprovideexplanation";
		public gnext_authorizeanothertoaccess: string = "gnext_authorizeanothertoaccess";
		public gnext_datesigned: string = "gnext_datesigned";
		public gnext_psoparentlastname: string = "gnext_psoparentlastname";
		public gnext_september11thvictimcompensationfund: string = "gnext_september11thvictimcompensationfund";
		public gnext_applicationvalidatedname: string = "gnext_applicationvalidatedname";
		public gnext_officerdateofmedicalretirement: string = "gnext_officerdateofmedicalretirement";
		public gnext_september11tvictimcompensationfundfinal: string = "gnext_september11tvictimcompensationfundfinal";
		public gnext_otherorganization: string = "gnext_otherorganization";
		public gnext_officerhadsurvivingparentsname: string = "gnext_officerhadsurvivingparentsname";
		public gnext_numberofadultchildren: string = "gnext_numberofadultchildren";
		public gnext_numberofotherbeneficiaries: string = "gnext_numberofotherbeneficiaries";
		public gnext_hasafinaldeterminationbeenissuedfor: string = "gnext_hasafinaldeterminationbeenissuedfor";
		public gnext_officerhadchildrenpreviousrelationshipname: string = "gnext_officerhadchildrenpreviousrelationshipname";
		public gnext_agencyrelationshiptopsoname: string = "gnext_agencyrelationshiptopsoname";
		public gnext_applicantsstatement1: string = "gnext_applicantsstatement1";
		public gnext_publicsafetyofficercountry: string = "gnext_publicsafetyofficercountry";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public gnext_injurytypestressorstrain: string = "gnext_injurytypestressorstrain";
		public gnext_agencyservicejurisdiction: string = "gnext_agencyservicejurisdiction";
		public gnext_claimantrepresentationconfirmationname: string = "gnext_claimantrepresentationconfirmationname";
		public gnext_medicalretirementdate: string = "gnext_medicalretirementdate";
		public gnext_filedeathreportname: string = "gnext_filedeathreportname";
		public gnext_state: string = "gnext_state";
		public gnext_injurytypeviralinfectionname: string = "gnext_injurytypeviralinfectionname";
		public gnext_officeremployedinnonciviliancapacity: string = "gnext_officeremployedinnonciviliancapacity";
		public gnext_attorneyforspouse: string = "gnext_attorneyforspouse";
		public gnext_lastname: string = "gnext_lastname";
		public gnext_applicationassigned: string = "gnext_applicationassigned";
		public gnext_typeofauthorizedrepresentative: string = "gnext_typeofauthorizedrepresentative";
		public gnext_determinedworkerscompensation: string = "gnext_determinedworkerscompensation";
		public _ownerid_value: string = "_ownerid_value";
		public gnext_prefixortitle: string = "gnext_prefixortitle";
		public owneridname: string = "owneridname";
		public gnext_certificationofapplication: string = "gnext_certificationofapplication";
		public gnext_indicationofvoluntaryintoxication: string = "gnext_indicationofvoluntaryintoxication";
		public gnext_officerengagementattimeofinjury: string = "gnext_officerengagementattimeofinjury";
		public gnext_nootherbenefitsfiledname: string = "gnext_nootherbenefitsfiledname";
		public gnext_injurytypestrokename: string = "gnext_injurytypestrokename";
		public gnext_officermaritalstatusattimeofdeath: string = "gnext_officermaritalstatusattimeofdeath";
		public gnext_officerdateofdeath: string = "gnext_officerdateofdeath";
		public gnext_createpsorecordname: string = "gnext_createpsorecordname";
		public gnext_injurytypevehicleboatairplanehelicopter: string = "gnext_injurytypevehicleboatairplanehelicopter";
		public gnext_certifyinformationastruename: string = "gnext_certifyinformationastruename";
		public gnext_anyindicationofgrossnegligencename: string = "gnext_anyindicationofgrossnegligencename";
		public gnext_applicationreceivedname: string = "gnext_applicationreceivedname";
		public traversedpath: string = "traversedpath";
		public gnext_otherclaimsfiled: string = "gnext_otherclaimsfiled";
		public gnext_officeremployedinnonciviliancapacityname: string = "gnext_officeremployedinnonciviliancapacityname";
		public gnext_injurytypeother: string = "gnext_injurytypeother";
		public gnext_applicationsubmittedname: string = "gnext_applicationsubmittedname";
		public gnext_filingextensionreceivedname: string = "gnext_filingextensionreceivedname";
		public gnext_publicsafetyofficerstate: string = "gnext_publicsafetyofficerstate";
		public gnext_publicsafetyofficerpriormarriagesname: string = "gnext_publicsafetyofficerpriormarriagesname";
		public gnext_injurytypeexplosives: string = "gnext_injurytypeexplosives";
		public gnext_dutystatusname: string = "gnext_dutystatusname";
		public gnext_psoparentstate: string = "gnext_psoparentstate";
		public gnext_agencybeenauthorizedtorepresent: string = "gnext_agencybeenauthorizedtorepresent";
		public gnext_ifyouknoworiginalclaimnumberpleaselist: string = "gnext_ifyouknoworiginalclaimnumberpleaselist";
		public gnext_publicsafetyofficeralternatephonenumber: string = "gnext_publicsafetyofficeralternatephonenumber";
		public gnext_injurytypevehicleboatairplanehelicoptername: string = "gnext_injurytypevehicleboatairplanehelicoptername";
		public gnext_psoparentstatename: string = "gnext_psoparentstatename";
		public gnext_injurytypephysicalblows: string = "gnext_injurytypephysicalblows";
		public gnext_determinedstatelineofdutydeathbenefits: string = "gnext_determinedstatelineofdutydeathbenefits";
		public gnext_authorizeanothertoaccessname: string = "gnext_authorizeanothertoaccessname";
		public gnext_september11tvictimcompensationfundfinalname: string = "gnext_september11tvictimcompensationfundfinalname";
		public gnext_nootherbenefitsdeterminedname: string = "gnext_nootherbenefitsdeterminedname";
		public gnext_claimantidyominame: string = "gnext_claimantidyominame";
		public gnext_officerfirstname: string = "gnext_officerfirstname";
		public gnext_econdolencedrafted: string = "gnext_econdolencedrafted";
		public gnext_appfiledundersocialsecurity: string = "gnext_appfiledundersocialsecurity";
		public gnext_lastchildentityupdateddate: string = "gnext_lastchildentityupdateddate";
		public gnext_september11thvictimcompensationfundname: string = "gnext_september11thvictimcompensationfundname";
		public gnext_applicationreceived: string = "gnext_applicationreceived";
		public gnext_injurytypeelectricityname: string = "gnext_injurytypeelectricityname";
		public gnext_numberofchildren: string = "gnext_numberofchildren";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_nameofminorchildsparentorlegalguardian: string = "gnext_nameofminorchildsparentorlegalguardian";
		public gnext_officercurrentlyworkingorvolunteeringname: string = "gnext_officercurrentlyworkingorvolunteeringname";
		public _gnext_psoid_value: string = "_gnext_psoid_value";
		public gnext_nootherbenefitsdetermined: string = "gnext_nootherbenefitsdetermined";
		public gnext_publicsafetyofficerpriormarriages_wfs: string = "gnext_publicsafetyofficerpriormarriages_wfs";
		public gnext_injurytyperadiation: string = "gnext_injurytyperadiation";
		public gnext_attorneyforspouseyominame: string = "gnext_attorneyforspouseyominame";
		public gnext_didthepsohavesurvivingadultchildren: string = "gnext_didthepsohavesurvivingadultchildren";
		public gnext_noncivilianmilitarycapacityexplanation: string = "gnext_noncivilianmilitarycapacityexplanation";
		public gnext_numberofadultchildrenname: string = "gnext_numberofadultchildrenname";
		public gnext_bypasspreapplication: string = "gnext_bypasspreapplication";
		public gnext_specifyothertypeofauthrep: string = "gnext_specifyothertypeofauthrep";
		public gnext_applicationreferenceidentifier: string = "gnext_applicationreferenceidentifier";
		public gnext_federalemployeescompensationactfinalname: string = "gnext_federalemployeescompensationactfinalname";
		public gnext_officerengagementattimeofinjuryname: string = "gnext_officerengagementattimeofinjuryname";
		public gnext_officerhaddesigneeorlifeinsbeneficiaryname: string = "gnext_officerhaddesigneeorlifeinsbeneficiaryname";
		public gnext_employingagencyheadcountry: string = "gnext_employingagencyheadcountry";
		public gnext_publicsafetyofficerpriormarriages_wfsname: string = "gnext_publicsafetyofficerpriormarriages_wfsname";
		public createdon: string = "createdon";
		public gnext_psoparenttelephone: string = "gnext_psoparenttelephone";
		public gnext_hasafinaldeterminationbeenissuedforname: string = "gnext_hasafinaldeterminationbeenissuedforname";
		public gnext_agencyrelationshiptopso: string = "gnext_agencyrelationshiptopso";
		public gnext_publicsafetyofficerstatename: string = "gnext_publicsafetyofficerstatename";
		public gnext_unvalidateddocs: string = "gnext_unvalidateddocs";
		public gnext_agencyclassification: string = "gnext_agencyclassification";
		public gnext_applicationtype: string = "gnext_applicationtype";
		public gnext_needsadditionalrequireddocumentsname: string = "gnext_needsadditionalrequireddocumentsname";
		public gnext_employingagencystate: string = "gnext_employingagencystate";
		public gnext_numberofparentsname: string = "gnext_numberofparentsname";
		public gnext_numberoflifeinsurancedesignees: string = "gnext_numberoflifeinsurancedesignees";
		public gnext_numberofdesignees: string = "gnext_numberofdesignees";
		public gnext_officerchildren_wfsname: string = "gnext_officerchildren_wfsname";
		public gnext_numberoftimespsowasmarried: string = "gnext_numberoftimespsowasmarried";
		public gnext_publicsafetyofficeraddressline2: string = "gnext_publicsafetyofficeraddressline2";
		public gnext_officermarriedattimeofinjury_wfs: string = "gnext_officermarriedattimeofinjury_wfs";
		public gnext_notification1: string = "gnext_notification1";
		public gnext_notification2: string = "gnext_notification2";
		public gnext_notification3: string = "gnext_notification3";
		public gnext_officerhadlifeinsurancedesigneename: string = "gnext_officerhadlifeinsurancedesigneename";
		public gnext_concernsofpolicesurvivorsinc_wfsname: string = "gnext_concernsofpolicesurvivorsinc_wfsname";
		public gnext_undergoindependentmedicalexpertreview: string = "gnext_undergoindependentmedicalexpertreview";
		public gnext_employingagencyheadstate: string = "gnext_employingagencyheadstate";
		public gnext_psoparentzipcode: string = "gnext_psoparentzipcode";
		public gnext_appholderidname: string = "gnext_appholderidname";
		public gnext_address2: string = "gnext_address2";
		public gnext_spousezipcode: string = "gnext_spousezipcode";
		public gnext_employingagencycountry: string = "gnext_employingagencycountry";
		public gnext_injurytypevascularrupturename: string = "gnext_injurytypevascularrupturename";
		public gnext_whatisthehighesteducationalleveltheoffice: string = "gnext_whatisthehighesteducationalleveltheoffice";
		public gnext_officertitle: string = "gnext_officertitle";
		public gnext_authorizedtorepresentactingonbehalfofname: string = "gnext_authorizedtorepresentactingonbehalfofname";
		public gnext_anyindicationofgrossnegligence: string = "gnext_anyindicationofgrossnegligence";
		public _gnext_appholderid_value: string = "_gnext_appholderid_value";
		public statecode: string = "statecode";
		public statuscode: string = "statuscode";
		public gnext_officersphonenumber: string = "gnext_officersphonenumber";
		public gnext_officermedicallyretired: string = "gnext_officermedicallyretired";
		public gnext_applicantsstatement2: string = "gnext_applicantsstatement2";
		public gnext_nameofindividualyourepresent: string = "gnext_nameofindividualyourepresent";
		public gnext_officermarriedattimeofinjury: string = "gnext_officermarriedattimeofinjury";
		public gnext_employingagencyheadfirstname: string = "gnext_employingagencyheadfirstname";
		public gnext_applicantrelationship: string = "gnext_applicantrelationship";
		public gnext_officermaritalstatusname: string = "gnext_officermaritalstatusname";
		public gnext_officerchildren: string = "gnext_officerchildren";
		public gnext_relationshiptopsoname: string = "gnext_relationshiptopsoname";
		public gnext_otherbenefitsdetermined: string = "gnext_otherbenefitsdetermined";
		public gnext_setapplicantname: string = "gnext_setapplicantname";
		public gnext_concernsofpolicesurvivorsinc_wfs: string = "gnext_concernsofpolicesurvivorsinc_wfs";
		public gnext_areyouauthorizedtorepresentthispersonname: string = "gnext_areyouauthorizedtorepresentthispersonname";
		public gnext_employingagencyzip: string = "gnext_employingagencyzip";
		public gnext_injurytypeviralinfection: string = "gnext_injurytypeviralinfection";
		public gnext_employingagencyheadaddressline1: string = "gnext_employingagencyheadaddressline1";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_concernsofpolicesurvivorsincname: string = "gnext_concernsofpolicesurvivorsincname";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public gnext_otherstate: string = "gnext_otherstate";
		public gnext_indicationofowndisabilityorinjuryname: string = "gnext_indicationofowndisabilityorinjuryname";
		public gnext_designateanauthorizedrepresentative: string = "gnext_designateanauthorizedrepresentative";
		public gnext_relationshiptopso: string = "gnext_relationshiptopso";
		public owninguser: string = "owninguser";
		public gnext_dutystatusdescribe: string = "gnext_dutystatusdescribe";
		public gnext_signingasauthorizedrepname: string = "gnext_signingasauthorizedrepname";
		public gnext_injurytypevascularrupture: string = "gnext_injurytypevascularrupture";
		public gnext_officerdateofbirth: string = "gnext_officerdateofbirth";
		public gnext_injurytypesharpinstrumentsbluntobjectsname: string = "gnext_injurytypesharpinstrumentsbluntobjectsname";
		public gnext_datereceived: string = "gnext_datereceived";
		public gnext_injurytypestroke: string = "gnext_injurytypestroke";
		public gnext_describetypeofauthorizedrepresentativeoth: string = "gnext_describetypeofauthorizedrepresentativeoth";
		public gnext_injurytyperadiationname: string = "gnext_injurytyperadiationname";
		public gnext_unvalidateddocsname: string = "gnext_unvalidateddocsname";
		public gnext_needsadditionalrequireddocuments: string = "gnext_needsadditionalrequireddocuments";
		public gnext_deteminationissuedworkerscompensationname: string = "gnext_deteminationissuedworkerscompensationname";
		public gnext_employingagencyline2: string = "gnext_employingagencyline2";
		public gnext_deteminationissuedmedicalretirementdis: string = "gnext_deteminationissuedmedicalretirementdis";
		public gnext_intentionalmisconductexplanation: string = "gnext_intentionalmisconductexplanation";
		public gnext_officerdateofincident: string = "gnext_officerdateofincident";
		public gnext_officerchildrenname: string = "gnext_officerchildrenname";
		public gnext_iscontactinformationforagencyheadthesamename: string = "gnext_iscontactinformationforagencyheadthesamename";
		public gnext_applicationonholdname: string = "gnext_applicationonholdname";
		public gnext_hasaclaimbeenfiledundername: string = "gnext_hasaclaimbeenfiledundername";
		public gnext_injurytypeoccupationaldisease: string = "gnext_injurytypeoccupationaldisease";
		public gnext_spousestate: string = "gnext_spousestate";
		public gnext_name: string = "gnext_name";
		public gnext_federalemployeescompensationact: string = "gnext_federalemployeescompensationact";
		public gnext_describeotherprefix: string = "gnext_describeotherprefix";
		public gnext_numberoflifeinsurancedesigneesname: string = "gnext_numberoflifeinsurancedesigneesname";
		public gnext_representingapplicantname: string = "gnext_representingapplicantname";
		public gnext_employingagencyheadaddressline2: string = "gnext_employingagencyheadaddressline2";
		public gnext_injurytypeexplosivesname: string = "gnext_injurytypeexplosivesname";
		public gnext_injurytypeothername: string = "gnext_injurytypeothername";
		public gnext_designateanauthorizedrepresentativename: string = "gnext_designateanauthorizedrepresentativename";
		public gnext_agencysubmissionstatus: string = "gnext_agencysubmissionstatus";
		public gnext_agencyclassificationname: string = "gnext_agencyclassificationname";
		public gnext_spouselastname: string = "gnext_spouselastname";
		public gnext_officermarriedattimeofinjuryname: string = "gnext_officermarriedattimeofinjuryname";
		public owneridtype: string = "owneridtype";
		public gnext_spouseemail: string = "gnext_spouseemail";
		public gnext_attorneyforspousename: string = "gnext_attorneyforspousename";
		public gnext_nationalfallenfirefightersfoundation: string = "gnext_nationalfallenfirefightersfoundation";
		public gnext_describeotherdetermination: string = "gnext_describeotherdetermination";
		public gnext_injurytypephysicalblowsname: string = "gnext_injurytypephysicalblowsname";
		public gnext_injurytypesharpinstrumentsbluntobjects: string = "gnext_injurytypesharpinstrumentsbluntobjects";
		public gnext_psosuffix: string = "gnext_psosuffix";
		public gnext_publicsafetyofficerpriormarriages: string = "gnext_publicsafetyofficerpriormarriages";
		public gnext_injurytypefiresmokeinhalation: string = "gnext_injurytypefiresmokeinhalation";
		public gnext_applicantsstatement3: string = "gnext_applicantsstatement3";
		public gnext_signingasauthorizedrep: string = "gnext_signingasauthorizedrep";
		public gnext_federalemployeescompensationactname: string = "gnext_federalemployeescompensationactname";
		public gnext_representingapplicant: string = "gnext_representingapplicant";
		public createdbyyominame: string = "createdbyyominame";
		public gnext_federalemployeescompensationactfinal: string = "gnext_federalemployeescompensationactfinal";
		public gnext_officerhavechildrenattimeofinjuryname: string = "gnext_officerhavechildrenattimeofinjuryname";
		public gnext_prefixortitlename: string = "gnext_prefixortitlename";
		public gnext_employingagencyheadlastname: string = "gnext_employingagencyheadlastname";
		public gnext_survivingspousedateofmarriagetopso: string = "gnext_survivingspousedateofmarriagetopso";
		public gnext_deteminationissuedsocialsecurityname: string = "gnext_deteminationissuedsocialsecurityname";
		public gnext_causeofinjury: string = "gnext_causeofinjury";
		public gnext_submitmyownmedicalrecords: string = "gnext_submitmyownmedicalrecords";
		public gnext_submittedname: string = "gnext_submittedname";
		public gnext_filingextensionresponsesentname: string = "gnext_filingextensionresponsesentname";
		public gnext_appfiledundermedicalretirementdisability: string = "gnext_appfiledundermedicalretirementdisability";
		public gnext_spousemiddlename: string = "gnext_spousemiddlename";
		public createdbyname: string = "createdbyname";
		public gnext_deteminationissuedworkerscompensation: string = "gnext_deteminationissuedworkerscompensation";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public owningteam: string = "owningteam";
		public gnext_applicationvalidated: string = "gnext_applicationvalidated";
		public gnext_applicationonhold: string = "gnext_applicationonhold";
		public gnext_injurytypeheartattackname: string = "gnext_injurytypeheartattackname";
		public gnext_officerlastname: string = "gnext_officerlastname";
		public gnext_authorizedtorepresentactingonbehalfof: string = "gnext_authorizedtorepresentactingonbehalfof";
		public gnext_injurytypeinfectiousdisease: string = "gnext_injurytypeinfectiousdisease";
		public gnext_numberoftimespsowasmarriedname: string = "gnext_numberoftimespsowasmarriedname";
		public gnext_bypassapplicationname: string = "gnext_bypassapplicationname";
		public gnext_describeotherfiled: string = "gnext_describeotherfiled";
		public gnext_createpsorecord: string = "gnext_createpsorecord";
		public gnext_typeofauthorizedrepresentativename: string = "gnext_typeofauthorizedrepresentativename";
		public gnext_employingagencyheadstatename: string = "gnext_employingagencyheadstatename";
		public gnext_areyouauthorizedtorepresentthisperson: string = "gnext_areyouauthorizedtorepresentthisperson";
		public gnext_injurytypestressorstrainname: string = "gnext_injurytypestressorstrainname";
		public gnext_psoparentmiddlename: string = "gnext_psoparentmiddlename";
		public gnext_otherclaimsfiledname: string = "gnext_otherclaimsfiledname";
		public gnext_ifotherspecifyrelationship: string = "gnext_ifotherspecifyrelationship";
		public gnext_employingagencyheadalternatelphone: string = "gnext_employingagencyheadalternatelphone";
		public gnext_injurytypeoccupationaldiseasename: string = "gnext_injurytypeoccupationaldiseasename";
		public gnext_claimnumberassigned: string = "gnext_claimnumberassigned";
		public gnext_spousefirstname: string = "gnext_spousefirstname";
		public _stageid_value: string = "_stageid_value";
		public gnext_indicationofowndisabilityorinjury: string = "gnext_indicationofowndisabilityorinjury";
		public gnext_employingagencyheademailaddress: string = "gnext_employingagencyheademailaddress";
		public gnext_publicsafetyofficerzip: string = "gnext_publicsafetyofficerzip";
		public modifiedbyname: string = "modifiedbyname";
		public gnext_authorizedreporapplicantsignature: string = "gnext_authorizedreporapplicantsignature";
		public gnext_dcretirementanddisabilityact: string = "gnext_dcretirementanddisabilityact";
		public gnext_psonumberofchildrenattimeofinjuryname: string = "gnext_psonumberofchildrenattimeofinjuryname";
		public gnext_owninjuryintentexplanation: string = "gnext_owninjuryintentexplanation";
		public gnext_indicationofmisconduct: string = "gnext_indicationofmisconduct";
		public gnext_psoparentcountry: string = "gnext_psoparentcountry";
		public gnext_employingagencystatename: string = "gnext_employingagencystatename";
		public gnext_appfiledunderworkerscompensation: string = "gnext_appfiledunderworkerscompensation";
		public gnext_numberofdesigneesname: string = "gnext_numberofdesigneesname";
		public gnext_psorecordcreated: string = "gnext_psorecordcreated";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public modifiedby: string = "modifiedby";
		public gnext_offworkedatanyjobs_fol_theinj: string = "gnext_offworkedatanyjobs_fol_theinj";
		public owneridyominame: string = "owneridyominame";
		public gnext_employingagencyheadzip: string = "gnext_employingagencyheadzip";
		public _gnext_claimid_value: string = "_gnext_claimid_value";
		public gnext_authorizedtorepresenttheofficername: string = "gnext_authorizedtorepresenttheofficername";
		public gnext_claimidname: string = "gnext_claimidname";
		public gnext_filingextensionreceived: string = "gnext_filingextensionreceived";
		public gnext_grossnegligenceexplanation: string = "gnext_grossnegligenceexplanation";
		public gnext_injurytypechemicals: string = "gnext_injurytypechemicals";
		public gnext_applicationtypename: string = "gnext_applicationtypename";
		public gnext_submitted: string = "gnext_submitted";
		public gnext_digitallysign: string = "gnext_digitallysign";
		public gnext_toxicologyanalysis: string = "gnext_toxicologyanalysis";
		public gnext_undergoindependentmedicalexpertreviewname: string = "gnext_undergoindependentmedicalexpertreviewname";
		public overriddencreatedon: string = "overriddencreatedon";
		public gnext_applicantrelationshipname: string = "gnext_applicantrelationshipname";
		public gnext_psoidname: string = "gnext_psoidname";
		public gnext_determinedstatelineofdutydeathbenefitsname: string = "gnext_determinedstatelineofdutydeathbenefitsname";
		public gnext_otherbenefitsdeterminedname: string = "gnext_otherbenefitsdeterminedname";
		public gnext_officerhadchildrenpreviousrelationship: string = "gnext_officerhadchildrenpreviousrelationship";
		public gnext_injurytypefiresmokeinhalationname: string = "gnext_injurytypefiresmokeinhalationname";
		public gnext_bypasspreapplicationdate: string = "gnext_bypasspreapplicationdate";
		public gnext_injurytypechemicalsname: string = "gnext_injurytypechemicalsname";
		public gnext_psorecordcreatedname: string = "gnext_psorecordcreatedname";
		public gnext_statename: string = "gnext_statename";
		public gnext_nootherbenefitsfiled: string = "gnext_nootherbenefitsfiled";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public gnext_indicationofvoluntaryintoxicationname: string = "gnext_indicationofvoluntaryintoxicationname";
		public gnext_publicsafetyofficercity: string = "gnext_publicsafetyofficercity";
		public gnext_psoparentaddress2: string = "gnext_psoparentaddress2";
		public gnext_numberoftimesmarried: string = "gnext_numberoftimesmarried";
		public gnext_psoparentaddress1: string = "gnext_psoparentaddress1";
		public gnext_requireddocumentsuploadedorjustified: string = "gnext_requireddocumentsuploadedorjustified";
		public gnext_publicsafetyofficerdateofmedicalretiremen: string = "gnext_publicsafetyofficerdateofmedicalretiremen";
		public gnext_claimantidname: string = "gnext_claimantidname";
		public gnext_applicantrelationshiptothepso: string = "gnext_applicantrelationshiptothepso";
		public gnext_nationalfallenfirefightersfoundation_wfs: string = "gnext_nationalfallenfirefightersfoundation_wfs";
		public gnext_employingagencyheadtitle: string = "gnext_employingagencyheadtitle";
		public gnext_indicationofmisconductname: string = "gnext_indicationofmisconductname";
		public gnext_psoparentcity: string = "gnext_psoparentcity";
		public gnext_numberoftimesmarriedname: string = "gnext_numberoftimesmarriedname";
		public gnext_medicalquestionnairecompletedbyphysician: string = "gnext_medicalquestionnairecompletedbyphysician";
		public gnext_dcretirementanddisabilityfinalname: string = "gnext_dcretirementanddisabilityfinalname";
		public statuscodename: string = "statuscodename";
		public gnext_injurytypebullets: string = "gnext_injurytypebullets";
		public gnext_publicsafetyofficeremailaddress: string = "gnext_publicsafetyofficeremailaddress";
		public _processid_value: string = "_processid_value";
		public modifiedon: string = "modifiedon";
		public gnext_hasofficerreceivedvocationaltrainingname: string = "gnext_hasofficerreceivedvocationaltrainingname";
		public gnext_filingextensionreviewed: string = "gnext_filingextensionreviewed";
		public gnext_applicanttype: string = "gnext_applicanttype";
		public gnext_publicsafetyofficeraddressline1: string = "gnext_publicsafetyofficeraddressline1";
		public gnext_psonumberofchildrenattimeofinjury: string = "gnext_psonumberofchildrenattimeofinjury";
		public gnext_dcretirementanddisabilityfinal: string = "gnext_dcretirementanddisabilityfinal";
		public gnext_injurytypebulletsname: string = "gnext_injurytypebulletsname";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public gnext_applicationreviewedtimelyname: string = "gnext_applicationreviewedtimelyname";
		public gnext_officermedicallyretiredname: string = "gnext_officermedicallyretiredname";
		public gnext_applicationstage: string = "gnext_applicationstage";
		public gnext_applicationsubmitted: string = "gnext_applicationsubmitted";
		public gnext_hastheofficerreceivedanyformalvocationalo: string = "gnext_hastheofficerreceivedanyformalvocationalo";
		public gnext_applicanteditrequired: string = "gnext_applicanteditrequired";
		public createdby: string = "createdby";
		public gnext_medicalquestionnairecompletedbyphysicianname: string = "gnext_medicalquestionnairecompletedbyphysicianname";
		public gnext_officerhadsurvivingparents: string = "gnext_officerhadsurvivingparents";
		public gnext_hasofficerreceivedvocationaltraining: string = "gnext_hasofficerreceivedvocationaltraining";
		public gnext_applicationreviewedtimely: string = "gnext_applicationreviewedtimely";
		public _gnext_claimantid_value: string = "_gnext_claimantid_value";
			
    }
    /** @description Instantiates a gnext_application Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class gnext_application extends Entity {
		[key: string]: string | number
        public route: string = "gnext_applications";
		public gnext_theapplicantwishestofileinthiscapacity: string;
		public gnext_spouseaddress1: string;
		public gnext_theapplicantwishestofileinthiscapacityname: number;
		public gnext_filingextensionresponsesent: string;
		public gnext_psohavechildren_wfsname: number;
		public gnext_submitmyownmedicalrecordsname: number;
		public gnext_nationalfallenfirefightersfoundationname: number;
		public gnext_claimantrepresentationconfirmation: string;
		public gnext_phone: string;
		public gnext_psohavechildrenname: number;
		public gnext_officerssn: string;
		public gnext_appfiledundermedicalretirementdisabilityname: number;
		public gnext_determinedworkerscompensationname: number;
		public gnext_publicsafetyofficerphonenumber: string;
		public gnext_spousecity: string;
		public gnext_offworkedatanyjobs_fol_theinjname: number;
		public gnext_hasaclaimbeenfiledunder: string;
		public gnext_causeofinjuryname: number;
		public gnext_officermarriedtoanyoneelse: string;
		public gnext_applicationassignedname: number;
		public gnext_appfiledundersocialsecurityname: number;
		public gnext_bypasspreapplicationname: number;
		public gnext_nameofemployingagency: string;
		public gnext_zip: string;
		public gnext_datesubmittedcalculated: string;
		public gnext_publicsafetyofficersmaritalstatusname: number;
		public gnext_otherbenefitsfiledname: number;
		public gnext_agencysubmissionstatusname: number;
		public gnext_injurytypeelectricity: string;
		public gnext_authorizedtorepresenttheofficer: string;
		public gnext_injuryrelatedtoeventsof20010911: string;
		public gnext_toxicologyanalysisname: number;
		public gnext_officerhaddesigneeorlifeinsbeneficiary: string;
		public statecodename: number;
		public gnext_filedstatelineofdutydeathbenefitsname: number;
		public gnext_certificationofapplicationname: number;
		public gnext_digitallysignname: number;
		public gnext_officerhadlifeinsurancedesignee: string;
		public gnext_applicanttypename: number;
		public gnext_country: string;
		public gnext_employingagencyheadcity: string;
		public gnext_firstname: string;
		public gnext_filedstatelineofdutydeathbenefits: string;
		public gnext_officermarriedtoanyoneelsename: number;
		public gnext_currentdatetime: string;
		public gnext_dutystatus: string;
		public gnext_applicantrelationshiptothepsoname: number;
		public gnext_injuryrelatedtoeventsof20010911name: number;
		public gnext_spousestatename: number;
		public gnext_officermaritalstatus: string;
		public gnext_dcretirementanddisabilityactname: number;
		public gnext_employingagencycity: string;
		public importsequencenumber: number;
		public gnext_describeofficerworkingorvolunteering: string;
		public gnext_injurytypeheartattack: string;
		public gnext_ifnotretiredexplain: string;
		public gnext_econdolencedraftedname: number;
		public gnext_applicanteditrequiredname: number;
		public gnext_iscontactinformationforagencyheadthesame: string;
		public gnext_officerhavechildrenattimeofinjury: string;
		public gnext_bypassapplication: string;
		public owningbusinessunit: string;
		public gnext_concernsofpolicesurvivorsinc: string;
		public gnext_spousetelephonenumnber: string;
		public gnext_numberofparents: string;
		public gnext_applicationid: string;
		public createdonbehalfbyyominame: string;
		public gnext_agencybeenauthorizedtorepresentname: number;
		public gnext_psohavechildren_wfs: string;
		public gnext_injurytypeclimaticconditionsname: number;
		public gnext_officerchildren_wfs: string;
		public gnext_numberofotherbeneficiariesname: number;
		public gnext_psoparentfirstname: string;
		public gnext_appfiledunderworkerscompensationname: number;
		public gnext_otherbenefitsfiled: string;
		public gnext_employingagencyline1: string;
		public gnext_anyyoucannotprovidename: number;
		public gnext_publicsafetyofficersmaritalstatus: string;
		public gnext_injurytypeclimaticconditions: string;
		public gnext_bypassapplicationdate: string;
		public versionnumber: number;
		public gnext_causeofinjuryother: string;
		public gnext_spousealternatephonenumber: string;
		public gnext_applicationstagename: number;
		public gnext_certifyinformationastrue: string;
		public gnext_spousecountry: string;
		public gnext_injurytypeinfectiousdiseasename: number;
		public gnext_nationalfallenfirefightersfoundation_wfsname: number;
		public gnext_agencyservicejurisdictionname: number;
		public gnext_officermaritalstatusattimeofdeathname: number;
		public gnext_middlename: string;
		public gnext_setapplicantnamename: number;
		public gnext_psohavechildren: string;
		public gnext_officersalternatephone: string;
		public gnext_filingextensionreviewedname: number;
		public gnext_employingagencyheadgeneralphone: string;
		public gnext_econdolencesentname: number;
		public gnext_ifotherengagementtype: string;
		public gnext_anyyoucannotprovide: string;
		public gnext_deteminationissuedsocialsecurity: string;
		public gnext_officermarriedattimeofinjury_wfsname: number;
		public gnext_officerdateofdisability: string;
		public gnext_econdolencesent: string;
		public gnext_officercurrentlyworkingorvolunteering: string;
		public gnext_numberofchildrenname: number;
		public gnext_deteminationissuedmedicalretirementdisname: number;
		public gnext_officermiddlename: string;
		public gnext_city: string;
		public gnext_filedeathreport: string;
		public gnext_spouseaddress2: string;
		public gnext_officerworkedotherplacespostinjury: string;
		public gnext_didthepsohavesurvivingadultchildrenname: number;
		public gnext_address1: string;
		public gnext_ifotheragencyclassification: string;
		public gnext_anyyoucannotprovideexplanation: string;
		public gnext_authorizeanothertoaccess: string;
		public gnext_datesigned: string;
		public gnext_psoparentlastname: string;
		public gnext_september11thvictimcompensationfund: string;
		public gnext_applicationvalidatedname: number;
		public gnext_officerdateofmedicalretirement: string;
		public gnext_september11tvictimcompensationfundfinal: string;
		public gnext_otherorganization: string;
		public gnext_officerhadsurvivingparentsname: number;
		public gnext_numberofadultchildren: string;
		public gnext_numberofotherbeneficiaries: string;
		public gnext_hasafinaldeterminationbeenissuedfor: string;
		public gnext_officerhadchildrenpreviousrelationshipname: number;
		public gnext_agencyrelationshiptopsoname: number;
		public gnext_applicantsstatement1: string;
		public gnext_publicsafetyofficercountry: string;
		public createdonbehalfbyname: string;
		public gnext_injurytypestressorstrain: string;
		public gnext_agencyservicejurisdiction: string;
		public gnext_claimantrepresentationconfirmationname: number;
		public gnext_medicalretirementdate: string;
		public gnext_filedeathreportname: number;
		public gnext_state: string;
		public gnext_injurytypeviralinfectionname: number;
		public gnext_officeremployedinnonciviliancapacity: string;
		public gnext_attorneyforspouse: string;
		public gnext_lastname: string;
		public gnext_applicationassigned: string;
		public gnext_typeofauthorizedrepresentative: string;
		public gnext_determinedworkerscompensation: string;
		public _ownerid_value: string;
		public gnext_prefixortitle: string;
		public owneridname: string;
		public gnext_certificationofapplication: string;
		public gnext_indicationofvoluntaryintoxication: string;
		public gnext_officerengagementattimeofinjury: string;
		public gnext_nootherbenefitsfiledname: number;
		public gnext_injurytypestrokename: number;
		public gnext_officermaritalstatusattimeofdeath: string;
		public gnext_officerdateofdeath: string;
		public gnext_createpsorecordname: number;
		public gnext_injurytypevehicleboatairplanehelicopter: string;
		public gnext_certifyinformationastruename: number;
		public gnext_anyindicationofgrossnegligencename: number;
		public gnext_applicationreceivedname: number;
		public traversedpath: string;
		public gnext_otherclaimsfiled: string;
		public gnext_officeremployedinnonciviliancapacityname: number;
		public gnext_injurytypeother: string;
		public gnext_applicationsubmittedname: number;
		public gnext_filingextensionreceivedname: number;
		public gnext_publicsafetyofficerstate: string;
		public gnext_publicsafetyofficerpriormarriagesname: number;
		public gnext_injurytypeexplosives: string;
		public gnext_dutystatusname: number;
		public gnext_psoparentstate: string;
		public gnext_agencybeenauthorizedtorepresent: string;
		public gnext_ifyouknoworiginalclaimnumberpleaselist: string;
		public gnext_publicsafetyofficeralternatephonenumber: string;
		public gnext_injurytypevehicleboatairplanehelicoptername: number;
		public gnext_psoparentstatename: number;
		public gnext_injurytypephysicalblows: string;
		public gnext_determinedstatelineofdutydeathbenefits: string;
		public gnext_authorizeanothertoaccessname: number;
		public gnext_september11tvictimcompensationfundfinalname: number;
		public gnext_nootherbenefitsdeterminedname: number;
		public gnext_claimantidyominame: string;
		public gnext_officerfirstname: string;
		public gnext_econdolencedrafted: string;
		public gnext_appfiledundersocialsecurity: string;
		public gnext_lastchildentityupdateddate: string;
		public gnext_september11thvictimcompensationfundname: number;
		public gnext_applicationreceived: string;
		public gnext_injurytypeelectricityname: number;
		public gnext_numberofchildren: string;
		public createdonbehalfby: string;
		public gnext_nameofminorchildsparentorlegalguardian: string;
		public gnext_officercurrentlyworkingorvolunteeringname: number;
		public _gnext_psoid_value: string;
		public gnext_nootherbenefitsdetermined: string;
		public gnext_publicsafetyofficerpriormarriages_wfs: string;
		public gnext_injurytyperadiation: string;
		public gnext_attorneyforspouseyominame: string;
		public gnext_didthepsohavesurvivingadultchildren: string;
		public gnext_noncivilianmilitarycapacityexplanation: string;
		public gnext_numberofadultchildrenname: number;
		public gnext_bypasspreapplication: string;
		public gnext_specifyothertypeofauthrep: string;
		public gnext_applicationreferenceidentifier: string;
		public gnext_federalemployeescompensationactfinalname: number;
		public gnext_officerengagementattimeofinjuryname: number;
		public gnext_officerhaddesigneeorlifeinsbeneficiaryname: number;
		public gnext_employingagencyheadcountry: string;
		public gnext_publicsafetyofficerpriormarriages_wfsname: number;
		public createdon: string;
		public gnext_psoparenttelephone: string;
		public gnext_hasafinaldeterminationbeenissuedforname: number;
		public gnext_agencyrelationshiptopso: string;
		public gnext_publicsafetyofficerstatename: number;
		public gnext_unvalidateddocs: string;
		public gnext_agencyclassification: string;
		public gnext_applicationtype: string;
		public gnext_needsadditionalrequireddocumentsname: number;
		public gnext_employingagencystate: string;
		public gnext_numberofparentsname: number;
		public gnext_numberoflifeinsurancedesignees: string;
		public gnext_numberofdesignees: string;
		public gnext_officerchildren_wfsname: number;
		public gnext_numberoftimespsowasmarried: string;
		public gnext_publicsafetyofficeraddressline2: string;
		public gnext_officermarriedattimeofinjury_wfs: string;
		public gnext_notification1: string;
		public gnext_notification2: string;
		public gnext_notification3: string;
		public gnext_officerhadlifeinsurancedesigneename: number;
		public gnext_concernsofpolicesurvivorsinc_wfsname: number;
		public gnext_undergoindependentmedicalexpertreview: string;
		public gnext_employingagencyheadstate: string;
		public gnext_psoparentzipcode: string;
		public gnext_appholderidname: string;
		public gnext_address2: string;
		public gnext_spousezipcode: string;
		public gnext_employingagencycountry: string;
		public gnext_injurytypevascularrupturename: number;
		public gnext_whatisthehighesteducationalleveltheoffice: string;
		public gnext_officertitle: string;
		public gnext_authorizedtorepresentactingonbehalfofname: number;
		public gnext_anyindicationofgrossnegligence: string;
		public _gnext_appholderid_value: string;
		public statecode: number;
		public statuscode: string;
		public gnext_officersphonenumber: string;
		public gnext_officermedicallyretired: string;
		public gnext_applicantsstatement2: string;
		public gnext_nameofindividualyourepresent: string;
		public gnext_officermarriedattimeofinjury: string;
		public gnext_employingagencyheadfirstname: string;
		public gnext_applicantrelationship: string;
		public gnext_officermaritalstatusname: number;
		public gnext_officerchildren: string;
		public gnext_relationshiptopsoname: number;
		public gnext_otherbenefitsdetermined: string;
		public gnext_setapplicantname: string;
		public gnext_concernsofpolicesurvivorsinc_wfs: string;
		public gnext_areyouauthorizedtorepresentthispersonname: number;
		public gnext_employingagencyzip: string;
		public gnext_injurytypeviralinfection: string;
		public gnext_employingagencyheadaddressline1: string;
		public timezoneruleversionnumber: number;
		public gnext_concernsofpolicesurvivorsincname: number;
		public modifiedonbehalfbyyominame: string;
		public gnext_otherstate: string;
		public gnext_indicationofowndisabilityorinjuryname: number;
		public gnext_designateanauthorizedrepresentative: string;
		public gnext_relationshiptopso: string;
		public owninguser: string;
		public gnext_dutystatusdescribe: string;
		public gnext_signingasauthorizedrepname: number;
		public gnext_injurytypevascularrupture: string;
		public gnext_officerdateofbirth: string;
		public gnext_injurytypesharpinstrumentsbluntobjectsname: number;
		public gnext_datereceived: string;
		public gnext_injurytypestroke: string;
		public gnext_describetypeofauthorizedrepresentativeoth: string;
		public gnext_injurytyperadiationname: number;
		public gnext_unvalidateddocsname: number;
		public gnext_needsadditionalrequireddocuments: string;
		public gnext_deteminationissuedworkerscompensationname: number;
		public gnext_employingagencyline2: string;
		public gnext_deteminationissuedmedicalretirementdis: string;
		public gnext_intentionalmisconductexplanation: string;
		public gnext_officerdateofincident: string;
		public gnext_officerchildrenname: number;
		public gnext_iscontactinformationforagencyheadthesamename: number;
		public gnext_applicationonholdname: number;
		public gnext_hasaclaimbeenfiledundername: number;
		public gnext_injurytypeoccupationaldisease: string;
		public gnext_spousestate: string;
		public gnext_name: string;
		public gnext_federalemployeescompensationact: string;
		public gnext_describeotherprefix: string;
		public gnext_numberoflifeinsurancedesigneesname: number;
		public gnext_representingapplicantname: number;
		public gnext_employingagencyheadaddressline2: string;
		public gnext_injurytypeexplosivesname: number;
		public gnext_injurytypeothername: number;
		public gnext_designateanauthorizedrepresentativename: number;
		public gnext_agencysubmissionstatus: string;
		public gnext_agencyclassificationname: number;
		public gnext_spouselastname: string;
		public gnext_officermarriedattimeofinjuryname: number;
		public owneridtype: string;
		public gnext_spouseemail: string;
		public gnext_attorneyforspousename: string;
		public gnext_nationalfallenfirefightersfoundation: string;
		public gnext_describeotherdetermination: string;
		public gnext_injurytypephysicalblowsname: number;
		public gnext_injurytypesharpinstrumentsbluntobjects: string;
		public gnext_psosuffix: string;
		public gnext_publicsafetyofficerpriormarriages: string;
		public gnext_injurytypefiresmokeinhalation: string;
		public gnext_applicantsstatement3: string;
		public gnext_signingasauthorizedrep: string;
		public gnext_federalemployeescompensationactname: number;
		public gnext_representingapplicant: string;
		public createdbyyominame: string;
		public gnext_federalemployeescompensationactfinal: string;
		public gnext_officerhavechildrenattimeofinjuryname: number;
		public gnext_prefixortitlename: number;
		public gnext_employingagencyheadlastname: string;
		public gnext_survivingspousedateofmarriagetopso: string;
		public gnext_deteminationissuedsocialsecurityname: number;
		public gnext_causeofinjury: string;
		public gnext_submitmyownmedicalrecords: string;
		public gnext_submittedname: number;
		public gnext_filingextensionresponsesentname: number;
		public gnext_appfiledundermedicalretirementdisability: string;
		public gnext_spousemiddlename: string;
		public createdbyname: string;
		public gnext_deteminationissuedworkerscompensation: string;
		public modifiedonbehalfby: string;
		public owningteam: string;
		public gnext_applicationvalidated: string;
		public gnext_applicationonhold: string;
		public gnext_injurytypeheartattackname: number;
		public gnext_officerlastname: string;
		public gnext_authorizedtorepresentactingonbehalfof: string;
		public gnext_injurytypeinfectiousdisease: string;
		public gnext_numberoftimespsowasmarriedname: number;
		public gnext_bypassapplicationname: number;
		public gnext_describeotherfiled: string;
		public gnext_createpsorecord: string;
		public gnext_typeofauthorizedrepresentativename: number;
		public gnext_employingagencyheadstatename: number;
		public gnext_areyouauthorizedtorepresentthisperson: string;
		public gnext_injurytypestressorstrainname: number;
		public gnext_psoparentmiddlename: string;
		public gnext_otherclaimsfiledname: number;
		public gnext_ifotherspecifyrelationship: string;
		public gnext_employingagencyheadalternatelphone: string;
		public gnext_injurytypeoccupationaldiseasename: number;
		public gnext_claimnumberassigned: string;
		public gnext_spousefirstname: string;
		public _stageid_value: string;
		public gnext_indicationofowndisabilityorinjury: string;
		public gnext_employingagencyheademailaddress: string;
		public gnext_publicsafetyofficerzip: string;
		public modifiedbyname: string;
		public gnext_authorizedreporapplicantsignature: string;
		public gnext_dcretirementanddisabilityact: string;
		public gnext_psonumberofchildrenattimeofinjuryname: number;
		public gnext_owninjuryintentexplanation: string;
		public gnext_indicationofmisconduct: string;
		public gnext_psoparentcountry: string;
		public gnext_employingagencystatename: number;
		public gnext_appfiledunderworkerscompensation: string;
		public gnext_numberofdesigneesname: number;
		public gnext_psorecordcreated: string;
		public modifiedonbehalfbyname: string;
		public modifiedby: string;
		public gnext_offworkedatanyjobs_fol_theinj: string;
		public owneridyominame: string;
		public gnext_employingagencyheadzip: string;
		public _gnext_claimid_value: string;
		public gnext_authorizedtorepresenttheofficername: number;
		public gnext_claimidname: string;
		public gnext_filingextensionreceived: string;
		public gnext_grossnegligenceexplanation: string;
		public gnext_injurytypechemicals: string;
		public gnext_applicationtypename: number;
		public gnext_submitted: string;
		public gnext_digitallysign: string;
		public gnext_toxicologyanalysis: string;
		public gnext_undergoindependentmedicalexpertreviewname: number;
		public overriddencreatedon: string;
		public gnext_applicantrelationshipname: number;
		public gnext_psoidname: string;
		public gnext_determinedstatelineofdutydeathbenefitsname: number;
		public gnext_otherbenefitsdeterminedname: number;
		public gnext_officerhadchildrenpreviousrelationship: string;
		public gnext_injurytypefiresmokeinhalationname: number;
		public gnext_bypasspreapplicationdate: string;
		public gnext_injurytypechemicalsname: number;
		public gnext_psorecordcreatedname: number;
		public gnext_statename: number;
		public gnext_nootherbenefitsfiled: string;
		public utcconversiontimezonecode: number;
		public gnext_indicationofvoluntaryintoxicationname: number;
		public gnext_publicsafetyofficercity: string;
		public gnext_psoparentaddress2: string;
		public gnext_numberoftimesmarried: string;
		public gnext_psoparentaddress1: string;
		public gnext_requireddocumentsuploadedorjustified: string;
		public gnext_publicsafetyofficerdateofmedicalretiremen: string;
		public gnext_claimantidname: string;
		public gnext_applicantrelationshiptothepso: string;
		public gnext_nationalfallenfirefightersfoundation_wfs: string;
		public gnext_employingagencyheadtitle: string;
		public gnext_indicationofmisconductname: number;
		public gnext_psoparentcity: string;
		public gnext_numberoftimesmarriedname: number;
		public gnext_medicalquestionnairecompletedbyphysician: string;
		public gnext_dcretirementanddisabilityfinalname: number;
		public statuscodename: number;
		public gnext_injurytypebullets: string;
		public gnext_publicsafetyofficeremailaddress: string;
		public _processid_value: string;
		public modifiedon: string;
		public gnext_hasofficerreceivedvocationaltrainingname: number;
		public gnext_filingextensionreviewed: string;
		public gnext_applicanttype: string;
		public gnext_publicsafetyofficeraddressline1: string;
		public gnext_psonumberofchildrenattimeofinjury: string;
		public gnext_dcretirementanddisabilityfinal: string;
		public gnext_injurytypebulletsname: number;
		public modifiedbyyominame: string;
		public gnext_applicationreviewedtimelyname: number;
		public gnext_officermedicallyretiredname: number;
		public gnext_applicationstage: string;
		public gnext_applicationsubmitted: string;
		public gnext_hastheofficerreceivedanyformalvocationalo: string;
		public gnext_applicanteditrequired: string;
		public createdby: string;
		public gnext_medicalquestionnairecompletedbyphysicianname: number;
		public gnext_officerhadsurvivingparents: string;
		public gnext_hasofficerreceivedvocationaltraining: string;
		public gnext_applicationreviewedtimely: string;
		public _gnext_claimantid_value: string;
			
        
        constructor(initData?: Ignext_application) {
			super("gnext_applications");        
            if (initData == undefined) return;
			this.gnext_theapplicantwishestofileinthiscapacity = initData.gnext_theapplicantwishestofileinthiscapacity;
			this.gnext_spouseaddress1 = initData.gnext_spouseaddress1;
			this.gnext_theapplicantwishestofileinthiscapacityname = initData.gnext_theapplicantwishestofileinthiscapacityname;
			this.gnext_filingextensionresponsesent = initData.gnext_filingextensionresponsesent;
			this.gnext_psohavechildren_wfsname = initData.gnext_psohavechildren_wfsname;
			this.gnext_submitmyownmedicalrecordsname = initData.gnext_submitmyownmedicalrecordsname;
			this.gnext_nationalfallenfirefightersfoundationname = initData.gnext_nationalfallenfirefightersfoundationname;
			this.gnext_claimantrepresentationconfirmation = initData.gnext_claimantrepresentationconfirmation;
			this.gnext_phone = initData.gnext_phone;
			this.gnext_psohavechildrenname = initData.gnext_psohavechildrenname;
			this.gnext_officerssn = initData.gnext_officerssn;
			this.gnext_appfiledundermedicalretirementdisabilityname = initData.gnext_appfiledundermedicalretirementdisabilityname;
			this.gnext_determinedworkerscompensationname = initData.gnext_determinedworkerscompensationname;
			this.gnext_publicsafetyofficerphonenumber = initData.gnext_publicsafetyofficerphonenumber;
			this.gnext_spousecity = initData.gnext_spousecity;
			this.gnext_offworkedatanyjobs_fol_theinjname = initData.gnext_offworkedatanyjobs_fol_theinjname;
			this.gnext_hasaclaimbeenfiledunder = initData.gnext_hasaclaimbeenfiledunder;
			this.gnext_causeofinjuryname = initData.gnext_causeofinjuryname;
			this.gnext_officermarriedtoanyoneelse = initData.gnext_officermarriedtoanyoneelse;
			this.gnext_applicationassignedname = initData.gnext_applicationassignedname;
			this.gnext_appfiledundersocialsecurityname = initData.gnext_appfiledundersocialsecurityname;
			this.gnext_bypasspreapplicationname = initData.gnext_bypasspreapplicationname;
			this.gnext_nameofemployingagency = initData.gnext_nameofemployingagency;
			this.gnext_zip = initData.gnext_zip;
			this.gnext_datesubmittedcalculated = initData.gnext_datesubmittedcalculated;
			this.gnext_publicsafetyofficersmaritalstatusname = initData.gnext_publicsafetyofficersmaritalstatusname;
			this.gnext_otherbenefitsfiledname = initData.gnext_otherbenefitsfiledname;
			this.gnext_agencysubmissionstatusname = initData.gnext_agencysubmissionstatusname;
			this.gnext_injurytypeelectricity = initData.gnext_injurytypeelectricity;
			this.gnext_authorizedtorepresenttheofficer = initData.gnext_authorizedtorepresenttheofficer;
			this.gnext_injuryrelatedtoeventsof20010911 = initData.gnext_injuryrelatedtoeventsof20010911;
			this.gnext_toxicologyanalysisname = initData.gnext_toxicologyanalysisname;
			this.gnext_officerhaddesigneeorlifeinsbeneficiary = initData.gnext_officerhaddesigneeorlifeinsbeneficiary;
			this.statecodename = initData.statecodename;
			this.gnext_filedstatelineofdutydeathbenefitsname = initData.gnext_filedstatelineofdutydeathbenefitsname;
			this.gnext_certificationofapplicationname = initData.gnext_certificationofapplicationname;
			this.gnext_digitallysignname = initData.gnext_digitallysignname;
			this.gnext_officerhadlifeinsurancedesignee = initData.gnext_officerhadlifeinsurancedesignee;
			this.gnext_applicanttypename = initData.gnext_applicanttypename;
			this.gnext_country = initData.gnext_country;
			this.gnext_employingagencyheadcity = initData.gnext_employingagencyheadcity;
			this.gnext_firstname = initData.gnext_firstname;
			this.gnext_filedstatelineofdutydeathbenefits = initData.gnext_filedstatelineofdutydeathbenefits;
			this.gnext_officermarriedtoanyoneelsename = initData.gnext_officermarriedtoanyoneelsename;
			this.gnext_currentdatetime = initData.gnext_currentdatetime;
			this.gnext_dutystatus = initData.gnext_dutystatus;
			this.gnext_applicantrelationshiptothepsoname = initData.gnext_applicantrelationshiptothepsoname;
			this.gnext_injuryrelatedtoeventsof20010911name = initData.gnext_injuryrelatedtoeventsof20010911name;
			this.gnext_spousestatename = initData.gnext_spousestatename;
			this.gnext_officermaritalstatus = initData.gnext_officermaritalstatus;
			this.gnext_dcretirementanddisabilityactname = initData.gnext_dcretirementanddisabilityactname;
			this.gnext_employingagencycity = initData.gnext_employingagencycity;
			this.importsequencenumber = initData.importsequencenumber;
			this.gnext_describeofficerworkingorvolunteering = initData.gnext_describeofficerworkingorvolunteering;
			this.gnext_injurytypeheartattack = initData.gnext_injurytypeheartattack;
			this.gnext_ifnotretiredexplain = initData.gnext_ifnotretiredexplain;
			this.gnext_econdolencedraftedname = initData.gnext_econdolencedraftedname;
			this.gnext_applicanteditrequiredname = initData.gnext_applicanteditrequiredname;
			this.gnext_iscontactinformationforagencyheadthesame = initData.gnext_iscontactinformationforagencyheadthesame;
			this.gnext_officerhavechildrenattimeofinjury = initData.gnext_officerhavechildrenattimeofinjury;
			this.gnext_bypassapplication = initData.gnext_bypassapplication;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.gnext_concernsofpolicesurvivorsinc = initData.gnext_concernsofpolicesurvivorsinc;
			this.gnext_spousetelephonenumnber = initData.gnext_spousetelephonenumnber;
			this.gnext_numberofparents = initData.gnext_numberofparents;
			this.gnext_applicationid = initData.gnext_applicationid;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.gnext_agencybeenauthorizedtorepresentname = initData.gnext_agencybeenauthorizedtorepresentname;
			this.gnext_psohavechildren_wfs = initData.gnext_psohavechildren_wfs;
			this.gnext_injurytypeclimaticconditionsname = initData.gnext_injurytypeclimaticconditionsname;
			this.gnext_officerchildren_wfs = initData.gnext_officerchildren_wfs;
			this.gnext_numberofotherbeneficiariesname = initData.gnext_numberofotherbeneficiariesname;
			this.gnext_psoparentfirstname = initData.gnext_psoparentfirstname;
			this.gnext_appfiledunderworkerscompensationname = initData.gnext_appfiledunderworkerscompensationname;
			this.gnext_otherbenefitsfiled = initData.gnext_otherbenefitsfiled;
			this.gnext_employingagencyline1 = initData.gnext_employingagencyline1;
			this.gnext_anyyoucannotprovidename = initData.gnext_anyyoucannotprovidename;
			this.gnext_publicsafetyofficersmaritalstatus = initData.gnext_publicsafetyofficersmaritalstatus;
			this.gnext_injurytypeclimaticconditions = initData.gnext_injurytypeclimaticconditions;
			this.gnext_bypassapplicationdate = initData.gnext_bypassapplicationdate;
			this.versionnumber = initData.versionnumber;
			this.gnext_causeofinjuryother = initData.gnext_causeofinjuryother;
			this.gnext_spousealternatephonenumber = initData.gnext_spousealternatephonenumber;
			this.gnext_applicationstagename = initData.gnext_applicationstagename;
			this.gnext_certifyinformationastrue = initData.gnext_certifyinformationastrue;
			this.gnext_spousecountry = initData.gnext_spousecountry;
			this.gnext_injurytypeinfectiousdiseasename = initData.gnext_injurytypeinfectiousdiseasename;
			this.gnext_nationalfallenfirefightersfoundation_wfsname = initData.gnext_nationalfallenfirefightersfoundation_wfsname;
			this.gnext_agencyservicejurisdictionname = initData.gnext_agencyservicejurisdictionname;
			this.gnext_officermaritalstatusattimeofdeathname = initData.gnext_officermaritalstatusattimeofdeathname;
			this.gnext_middlename = initData.gnext_middlename;
			this.gnext_setapplicantnamename = initData.gnext_setapplicantnamename;
			this.gnext_psohavechildren = initData.gnext_psohavechildren;
			this.gnext_officersalternatephone = initData.gnext_officersalternatephone;
			this.gnext_filingextensionreviewedname = initData.gnext_filingextensionreviewedname;
			this.gnext_employingagencyheadgeneralphone = initData.gnext_employingagencyheadgeneralphone;
			this.gnext_econdolencesentname = initData.gnext_econdolencesentname;
			this.gnext_ifotherengagementtype = initData.gnext_ifotherengagementtype;
			this.gnext_anyyoucannotprovide = initData.gnext_anyyoucannotprovide;
			this.gnext_deteminationissuedsocialsecurity = initData.gnext_deteminationissuedsocialsecurity;
			this.gnext_officermarriedattimeofinjury_wfsname = initData.gnext_officermarriedattimeofinjury_wfsname;
			this.gnext_officerdateofdisability = initData.gnext_officerdateofdisability;
			this.gnext_econdolencesent = initData.gnext_econdolencesent;
			this.gnext_officercurrentlyworkingorvolunteering = initData.gnext_officercurrentlyworkingorvolunteering;
			this.gnext_numberofchildrenname = initData.gnext_numberofchildrenname;
			this.gnext_deteminationissuedmedicalretirementdisname = initData.gnext_deteminationissuedmedicalretirementdisname;
			this.gnext_officermiddlename = initData.gnext_officermiddlename;
			this.gnext_city = initData.gnext_city;
			this.gnext_filedeathreport = initData.gnext_filedeathreport;
			this.gnext_spouseaddress2 = initData.gnext_spouseaddress2;
			this.gnext_officerworkedotherplacespostinjury = initData.gnext_officerworkedotherplacespostinjury;
			this.gnext_didthepsohavesurvivingadultchildrenname = initData.gnext_didthepsohavesurvivingadultchildrenname;
			this.gnext_address1 = initData.gnext_address1;
			this.gnext_ifotheragencyclassification = initData.gnext_ifotheragencyclassification;
			this.gnext_anyyoucannotprovideexplanation = initData.gnext_anyyoucannotprovideexplanation;
			this.gnext_authorizeanothertoaccess = initData.gnext_authorizeanothertoaccess;
			this.gnext_datesigned = initData.gnext_datesigned;
			this.gnext_psoparentlastname = initData.gnext_psoparentlastname;
			this.gnext_september11thvictimcompensationfund = initData.gnext_september11thvictimcompensationfund;
			this.gnext_applicationvalidatedname = initData.gnext_applicationvalidatedname;
			this.gnext_officerdateofmedicalretirement = initData.gnext_officerdateofmedicalretirement;
			this.gnext_september11tvictimcompensationfundfinal = initData.gnext_september11tvictimcompensationfundfinal;
			this.gnext_otherorganization = initData.gnext_otherorganization;
			this.gnext_officerhadsurvivingparentsname = initData.gnext_officerhadsurvivingparentsname;
			this.gnext_numberofadultchildren = initData.gnext_numberofadultchildren;
			this.gnext_numberofotherbeneficiaries = initData.gnext_numberofotherbeneficiaries;
			this.gnext_hasafinaldeterminationbeenissuedfor = initData.gnext_hasafinaldeterminationbeenissuedfor;
			this.gnext_officerhadchildrenpreviousrelationshipname = initData.gnext_officerhadchildrenpreviousrelationshipname;
			this.gnext_agencyrelationshiptopsoname = initData.gnext_agencyrelationshiptopsoname;
			this.gnext_applicantsstatement1 = initData.gnext_applicantsstatement1;
			this.gnext_publicsafetyofficercountry = initData.gnext_publicsafetyofficercountry;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.gnext_injurytypestressorstrain = initData.gnext_injurytypestressorstrain;
			this.gnext_agencyservicejurisdiction = initData.gnext_agencyservicejurisdiction;
			this.gnext_claimantrepresentationconfirmationname = initData.gnext_claimantrepresentationconfirmationname;
			this.gnext_medicalretirementdate = initData.gnext_medicalretirementdate;
			this.gnext_filedeathreportname = initData.gnext_filedeathreportname;
			this.gnext_state = initData.gnext_state;
			this.gnext_injurytypeviralinfectionname = initData.gnext_injurytypeviralinfectionname;
			this.gnext_officeremployedinnonciviliancapacity = initData.gnext_officeremployedinnonciviliancapacity;
			this.gnext_attorneyforspouse = initData.gnext_attorneyforspouse;
			this.gnext_lastname = initData.gnext_lastname;
			this.gnext_applicationassigned = initData.gnext_applicationassigned;
			this.gnext_typeofauthorizedrepresentative = initData.gnext_typeofauthorizedrepresentative;
			this.gnext_determinedworkerscompensation = initData.gnext_determinedworkerscompensation;
			this._ownerid_value = initData._ownerid_value;
			this.gnext_prefixortitle = initData.gnext_prefixortitle;
			this.owneridname = initData.owneridname;
			this.gnext_certificationofapplication = initData.gnext_certificationofapplication;
			this.gnext_indicationofvoluntaryintoxication = initData.gnext_indicationofvoluntaryintoxication;
			this.gnext_officerengagementattimeofinjury = initData.gnext_officerengagementattimeofinjury;
			this.gnext_nootherbenefitsfiledname = initData.gnext_nootherbenefitsfiledname;
			this.gnext_injurytypestrokename = initData.gnext_injurytypestrokename;
			this.gnext_officermaritalstatusattimeofdeath = initData.gnext_officermaritalstatusattimeofdeath;
			this.gnext_officerdateofdeath = initData.gnext_officerdateofdeath;
			this.gnext_createpsorecordname = initData.gnext_createpsorecordname;
			this.gnext_injurytypevehicleboatairplanehelicopter = initData.gnext_injurytypevehicleboatairplanehelicopter;
			this.gnext_certifyinformationastruename = initData.gnext_certifyinformationastruename;
			this.gnext_anyindicationofgrossnegligencename = initData.gnext_anyindicationofgrossnegligencename;
			this.gnext_applicationreceivedname = initData.gnext_applicationreceivedname;
			this.traversedpath = initData.traversedpath;
			this.gnext_otherclaimsfiled = initData.gnext_otherclaimsfiled;
			this.gnext_officeremployedinnonciviliancapacityname = initData.gnext_officeremployedinnonciviliancapacityname;
			this.gnext_injurytypeother = initData.gnext_injurytypeother;
			this.gnext_applicationsubmittedname = initData.gnext_applicationsubmittedname;
			this.gnext_filingextensionreceivedname = initData.gnext_filingextensionreceivedname;
			this.gnext_publicsafetyofficerstate = initData.gnext_publicsafetyofficerstate;
			this.gnext_publicsafetyofficerpriormarriagesname = initData.gnext_publicsafetyofficerpriormarriagesname;
			this.gnext_injurytypeexplosives = initData.gnext_injurytypeexplosives;
			this.gnext_dutystatusname = initData.gnext_dutystatusname;
			this.gnext_psoparentstate = initData.gnext_psoparentstate;
			this.gnext_agencybeenauthorizedtorepresent = initData.gnext_agencybeenauthorizedtorepresent;
			this.gnext_ifyouknoworiginalclaimnumberpleaselist = initData.gnext_ifyouknoworiginalclaimnumberpleaselist;
			this.gnext_publicsafetyofficeralternatephonenumber = initData.gnext_publicsafetyofficeralternatephonenumber;
			this.gnext_injurytypevehicleboatairplanehelicoptername = initData.gnext_injurytypevehicleboatairplanehelicoptername;
			this.gnext_psoparentstatename = initData.gnext_psoparentstatename;
			this.gnext_injurytypephysicalblows = initData.gnext_injurytypephysicalblows;
			this.gnext_determinedstatelineofdutydeathbenefits = initData.gnext_determinedstatelineofdutydeathbenefits;
			this.gnext_authorizeanothertoaccessname = initData.gnext_authorizeanothertoaccessname;
			this.gnext_september11tvictimcompensationfundfinalname = initData.gnext_september11tvictimcompensationfundfinalname;
			this.gnext_nootherbenefitsdeterminedname = initData.gnext_nootherbenefitsdeterminedname;
			this.gnext_claimantidyominame = initData.gnext_claimantidyominame;
			this.gnext_officerfirstname = initData.gnext_officerfirstname;
			this.gnext_econdolencedrafted = initData.gnext_econdolencedrafted;
			this.gnext_appfiledundersocialsecurity = initData.gnext_appfiledundersocialsecurity;
			this.gnext_lastchildentityupdateddate = initData.gnext_lastchildentityupdateddate;
			this.gnext_september11thvictimcompensationfundname = initData.gnext_september11thvictimcompensationfundname;
			this.gnext_applicationreceived = initData.gnext_applicationreceived;
			this.gnext_injurytypeelectricityname = initData.gnext_injurytypeelectricityname;
			this.gnext_numberofchildren = initData.gnext_numberofchildren;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.gnext_nameofminorchildsparentorlegalguardian = initData.gnext_nameofminorchildsparentorlegalguardian;
			this.gnext_officercurrentlyworkingorvolunteeringname = initData.gnext_officercurrentlyworkingorvolunteeringname;
			this._gnext_psoid_value = initData._gnext_psoid_value;
			this.gnext_nootherbenefitsdetermined = initData.gnext_nootherbenefitsdetermined;
			this.gnext_publicsafetyofficerpriormarriages_wfs = initData.gnext_publicsafetyofficerpriormarriages_wfs;
			this.gnext_injurytyperadiation = initData.gnext_injurytyperadiation;
			this.gnext_attorneyforspouseyominame = initData.gnext_attorneyforspouseyominame;
			this.gnext_didthepsohavesurvivingadultchildren = initData.gnext_didthepsohavesurvivingadultchildren;
			this.gnext_noncivilianmilitarycapacityexplanation = initData.gnext_noncivilianmilitarycapacityexplanation;
			this.gnext_numberofadultchildrenname = initData.gnext_numberofadultchildrenname;
			this.gnext_bypasspreapplication = initData.gnext_bypasspreapplication;
			this.gnext_specifyothertypeofauthrep = initData.gnext_specifyothertypeofauthrep;
			this.gnext_applicationreferenceidentifier = initData.gnext_applicationreferenceidentifier;
			this.gnext_federalemployeescompensationactfinalname = initData.gnext_federalemployeescompensationactfinalname;
			this.gnext_officerengagementattimeofinjuryname = initData.gnext_officerengagementattimeofinjuryname;
			this.gnext_officerhaddesigneeorlifeinsbeneficiaryname = initData.gnext_officerhaddesigneeorlifeinsbeneficiaryname;
			this.gnext_employingagencyheadcountry = initData.gnext_employingagencyheadcountry;
			this.gnext_publicsafetyofficerpriormarriages_wfsname = initData.gnext_publicsafetyofficerpriormarriages_wfsname;
			this.createdon = initData.createdon;
			this.gnext_psoparenttelephone = initData.gnext_psoparenttelephone;
			this.gnext_hasafinaldeterminationbeenissuedforname = initData.gnext_hasafinaldeterminationbeenissuedforname;
			this.gnext_agencyrelationshiptopso = initData.gnext_agencyrelationshiptopso;
			this.gnext_publicsafetyofficerstatename = initData.gnext_publicsafetyofficerstatename;
			this.gnext_unvalidateddocs = initData.gnext_unvalidateddocs;
			this.gnext_agencyclassification = initData.gnext_agencyclassification;
			this.gnext_applicationtype = initData.gnext_applicationtype;
			this.gnext_needsadditionalrequireddocumentsname = initData.gnext_needsadditionalrequireddocumentsname;
			this.gnext_employingagencystate = initData.gnext_employingagencystate;
			this.gnext_numberofparentsname = initData.gnext_numberofparentsname;
			this.gnext_numberoflifeinsurancedesignees = initData.gnext_numberoflifeinsurancedesignees;
			this.gnext_numberofdesignees = initData.gnext_numberofdesignees;
			this.gnext_officerchildren_wfsname = initData.gnext_officerchildren_wfsname;
			this.gnext_numberoftimespsowasmarried = initData.gnext_numberoftimespsowasmarried;
			this.gnext_publicsafetyofficeraddressline2 = initData.gnext_publicsafetyofficeraddressline2;
			this.gnext_officermarriedattimeofinjury_wfs = initData.gnext_officermarriedattimeofinjury_wfs;
			this.gnext_notification1 = initData.gnext_notification1;
			this.gnext_notification2 = initData.gnext_notification2;
			this.gnext_notification3 = initData.gnext_notification3;
			this.gnext_officerhadlifeinsurancedesigneename = initData.gnext_officerhadlifeinsurancedesigneename;
			this.gnext_concernsofpolicesurvivorsinc_wfsname = initData.gnext_concernsofpolicesurvivorsinc_wfsname;
			this.gnext_undergoindependentmedicalexpertreview = initData.gnext_undergoindependentmedicalexpertreview;
			this.gnext_employingagencyheadstate = initData.gnext_employingagencyheadstate;
			this.gnext_psoparentzipcode = initData.gnext_psoparentzipcode;
			this.gnext_appholderidname = initData.gnext_appholderidname;
			this.gnext_address2 = initData.gnext_address2;
			this.gnext_spousezipcode = initData.gnext_spousezipcode;
			this.gnext_employingagencycountry = initData.gnext_employingagencycountry;
			this.gnext_injurytypevascularrupturename = initData.gnext_injurytypevascularrupturename;
			this.gnext_whatisthehighesteducationalleveltheoffice = initData.gnext_whatisthehighesteducationalleveltheoffice;
			this.gnext_officertitle = initData.gnext_officertitle;
			this.gnext_authorizedtorepresentactingonbehalfofname = initData.gnext_authorizedtorepresentactingonbehalfofname;
			this.gnext_anyindicationofgrossnegligence = initData.gnext_anyindicationofgrossnegligence;
			this._gnext_appholderid_value = initData._gnext_appholderid_value;
			this.statecode = initData.statecode;
			this.statuscode = initData.statuscode;
			this.gnext_officersphonenumber = initData.gnext_officersphonenumber;
			this.gnext_officermedicallyretired = initData.gnext_officermedicallyretired;
			this.gnext_applicantsstatement2 = initData.gnext_applicantsstatement2;
			this.gnext_nameofindividualyourepresent = initData.gnext_nameofindividualyourepresent;
			this.gnext_officermarriedattimeofinjury = initData.gnext_officermarriedattimeofinjury;
			this.gnext_employingagencyheadfirstname = initData.gnext_employingagencyheadfirstname;
			this.gnext_applicantrelationship = initData.gnext_applicantrelationship;
			this.gnext_officermaritalstatusname = initData.gnext_officermaritalstatusname;
			this.gnext_officerchildren = initData.gnext_officerchildren;
			this.gnext_relationshiptopsoname = initData.gnext_relationshiptopsoname;
			this.gnext_otherbenefitsdetermined = initData.gnext_otherbenefitsdetermined;
			this.gnext_setapplicantname = initData.gnext_setapplicantname;
			this.gnext_concernsofpolicesurvivorsinc_wfs = initData.gnext_concernsofpolicesurvivorsinc_wfs;
			this.gnext_areyouauthorizedtorepresentthispersonname = initData.gnext_areyouauthorizedtorepresentthispersonname;
			this.gnext_employingagencyzip = initData.gnext_employingagencyzip;
			this.gnext_injurytypeviralinfection = initData.gnext_injurytypeviralinfection;
			this.gnext_employingagencyheadaddressline1 = initData.gnext_employingagencyheadaddressline1;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.gnext_concernsofpolicesurvivorsincname = initData.gnext_concernsofpolicesurvivorsincname;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.gnext_otherstate = initData.gnext_otherstate;
			this.gnext_indicationofowndisabilityorinjuryname = initData.gnext_indicationofowndisabilityorinjuryname;
			this.gnext_designateanauthorizedrepresentative = initData.gnext_designateanauthorizedrepresentative;
			this.gnext_relationshiptopso = initData.gnext_relationshiptopso;
			this.owninguser = initData.owninguser;
			this.gnext_dutystatusdescribe = initData.gnext_dutystatusdescribe;
			this.gnext_signingasauthorizedrepname = initData.gnext_signingasauthorizedrepname;
			this.gnext_injurytypevascularrupture = initData.gnext_injurytypevascularrupture;
			this.gnext_officerdateofbirth = initData.gnext_officerdateofbirth;
			this.gnext_injurytypesharpinstrumentsbluntobjectsname = initData.gnext_injurytypesharpinstrumentsbluntobjectsname;
			this.gnext_datereceived = initData.gnext_datereceived;
			this.gnext_injurytypestroke = initData.gnext_injurytypestroke;
			this.gnext_describetypeofauthorizedrepresentativeoth = initData.gnext_describetypeofauthorizedrepresentativeoth;
			this.gnext_injurytyperadiationname = initData.gnext_injurytyperadiationname;
			this.gnext_unvalidateddocsname = initData.gnext_unvalidateddocsname;
			this.gnext_needsadditionalrequireddocuments = initData.gnext_needsadditionalrequireddocuments;
			this.gnext_deteminationissuedworkerscompensationname = initData.gnext_deteminationissuedworkerscompensationname;
			this.gnext_employingagencyline2 = initData.gnext_employingagencyline2;
			this.gnext_deteminationissuedmedicalretirementdis = initData.gnext_deteminationissuedmedicalretirementdis;
			this.gnext_intentionalmisconductexplanation = initData.gnext_intentionalmisconductexplanation;
			this.gnext_officerdateofincident = initData.gnext_officerdateofincident;
			this.gnext_officerchildrenname = initData.gnext_officerchildrenname;
			this.gnext_iscontactinformationforagencyheadthesamename = initData.gnext_iscontactinformationforagencyheadthesamename;
			this.gnext_applicationonholdname = initData.gnext_applicationonholdname;
			this.gnext_hasaclaimbeenfiledundername = initData.gnext_hasaclaimbeenfiledundername;
			this.gnext_injurytypeoccupationaldisease = initData.gnext_injurytypeoccupationaldisease;
			this.gnext_spousestate = initData.gnext_spousestate;
			this.gnext_name = initData.gnext_name;
			this.gnext_federalemployeescompensationact = initData.gnext_federalemployeescompensationact;
			this.gnext_describeotherprefix = initData.gnext_describeotherprefix;
			this.gnext_numberoflifeinsurancedesigneesname = initData.gnext_numberoflifeinsurancedesigneesname;
			this.gnext_representingapplicantname = initData.gnext_representingapplicantname;
			this.gnext_employingagencyheadaddressline2 = initData.gnext_employingagencyheadaddressline2;
			this.gnext_injurytypeexplosivesname = initData.gnext_injurytypeexplosivesname;
			this.gnext_injurytypeothername = initData.gnext_injurytypeothername;
			this.gnext_designateanauthorizedrepresentativename = initData.gnext_designateanauthorizedrepresentativename;
			this.gnext_agencysubmissionstatus = initData.gnext_agencysubmissionstatus;
			this.gnext_agencyclassificationname = initData.gnext_agencyclassificationname;
			this.gnext_spouselastname = initData.gnext_spouselastname;
			this.gnext_officermarriedattimeofinjuryname = initData.gnext_officermarriedattimeofinjuryname;
			this.owneridtype = initData.owneridtype;
			this.gnext_spouseemail = initData.gnext_spouseemail;
			this.gnext_attorneyforspousename = initData.gnext_attorneyforspousename;
			this.gnext_nationalfallenfirefightersfoundation = initData.gnext_nationalfallenfirefightersfoundation;
			this.gnext_describeotherdetermination = initData.gnext_describeotherdetermination;
			this.gnext_injurytypephysicalblowsname = initData.gnext_injurytypephysicalblowsname;
			this.gnext_injurytypesharpinstrumentsbluntobjects = initData.gnext_injurytypesharpinstrumentsbluntobjects;
			this.gnext_psosuffix = initData.gnext_psosuffix;
			this.gnext_publicsafetyofficerpriormarriages = initData.gnext_publicsafetyofficerpriormarriages;
			this.gnext_injurytypefiresmokeinhalation = initData.gnext_injurytypefiresmokeinhalation;
			this.gnext_applicantsstatement3 = initData.gnext_applicantsstatement3;
			this.gnext_signingasauthorizedrep = initData.gnext_signingasauthorizedrep;
			this.gnext_federalemployeescompensationactname = initData.gnext_federalemployeescompensationactname;
			this.gnext_representingapplicant = initData.gnext_representingapplicant;
			this.createdbyyominame = initData.createdbyyominame;
			this.gnext_federalemployeescompensationactfinal = initData.gnext_federalemployeescompensationactfinal;
			this.gnext_officerhavechildrenattimeofinjuryname = initData.gnext_officerhavechildrenattimeofinjuryname;
			this.gnext_prefixortitlename = initData.gnext_prefixortitlename;
			this.gnext_employingagencyheadlastname = initData.gnext_employingagencyheadlastname;
			this.gnext_survivingspousedateofmarriagetopso = initData.gnext_survivingspousedateofmarriagetopso;
			this.gnext_deteminationissuedsocialsecurityname = initData.gnext_deteminationissuedsocialsecurityname;
			this.gnext_causeofinjury = initData.gnext_causeofinjury;
			this.gnext_submitmyownmedicalrecords = initData.gnext_submitmyownmedicalrecords;
			this.gnext_submittedname = initData.gnext_submittedname;
			this.gnext_filingextensionresponsesentname = initData.gnext_filingextensionresponsesentname;
			this.gnext_appfiledundermedicalretirementdisability = initData.gnext_appfiledundermedicalretirementdisability;
			this.gnext_spousemiddlename = initData.gnext_spousemiddlename;
			this.createdbyname = initData.createdbyname;
			this.gnext_deteminationissuedworkerscompensation = initData.gnext_deteminationissuedworkerscompensation;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.owningteam = initData.owningteam;
			this.gnext_applicationvalidated = initData.gnext_applicationvalidated;
			this.gnext_applicationonhold = initData.gnext_applicationonhold;
			this.gnext_injurytypeheartattackname = initData.gnext_injurytypeheartattackname;
			this.gnext_officerlastname = initData.gnext_officerlastname;
			this.gnext_authorizedtorepresentactingonbehalfof = initData.gnext_authorizedtorepresentactingonbehalfof;
			this.gnext_injurytypeinfectiousdisease = initData.gnext_injurytypeinfectiousdisease;
			this.gnext_numberoftimespsowasmarriedname = initData.gnext_numberoftimespsowasmarriedname;
			this.gnext_bypassapplicationname = initData.gnext_bypassapplicationname;
			this.gnext_describeotherfiled = initData.gnext_describeotherfiled;
			this.gnext_createpsorecord = initData.gnext_createpsorecord;
			this.gnext_typeofauthorizedrepresentativename = initData.gnext_typeofauthorizedrepresentativename;
			this.gnext_employingagencyheadstatename = initData.gnext_employingagencyheadstatename;
			this.gnext_areyouauthorizedtorepresentthisperson = initData.gnext_areyouauthorizedtorepresentthisperson;
			this.gnext_injurytypestressorstrainname = initData.gnext_injurytypestressorstrainname;
			this.gnext_psoparentmiddlename = initData.gnext_psoparentmiddlename;
			this.gnext_otherclaimsfiledname = initData.gnext_otherclaimsfiledname;
			this.gnext_ifotherspecifyrelationship = initData.gnext_ifotherspecifyrelationship;
			this.gnext_employingagencyheadalternatelphone = initData.gnext_employingagencyheadalternatelphone;
			this.gnext_injurytypeoccupationaldiseasename = initData.gnext_injurytypeoccupationaldiseasename;
			this.gnext_claimnumberassigned = initData.gnext_claimnumberassigned;
			this.gnext_spousefirstname = initData.gnext_spousefirstname;
			this._stageid_value = initData._stageid_value;
			this.gnext_indicationofowndisabilityorinjury = initData.gnext_indicationofowndisabilityorinjury;
			this.gnext_employingagencyheademailaddress = initData.gnext_employingagencyheademailaddress;
			this.gnext_publicsafetyofficerzip = initData.gnext_publicsafetyofficerzip;
			this.modifiedbyname = initData.modifiedbyname;
			this.gnext_authorizedreporapplicantsignature = initData.gnext_authorizedreporapplicantsignature;
			this.gnext_dcretirementanddisabilityact = initData.gnext_dcretirementanddisabilityact;
			this.gnext_psonumberofchildrenattimeofinjuryname = initData.gnext_psonumberofchildrenattimeofinjuryname;
			this.gnext_owninjuryintentexplanation = initData.gnext_owninjuryintentexplanation;
			this.gnext_indicationofmisconduct = initData.gnext_indicationofmisconduct;
			this.gnext_psoparentcountry = initData.gnext_psoparentcountry;
			this.gnext_employingagencystatename = initData.gnext_employingagencystatename;
			this.gnext_appfiledunderworkerscompensation = initData.gnext_appfiledunderworkerscompensation;
			this.gnext_numberofdesigneesname = initData.gnext_numberofdesigneesname;
			this.gnext_psorecordcreated = initData.gnext_psorecordcreated;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.modifiedby = initData.modifiedby;
			this.gnext_offworkedatanyjobs_fol_theinj = initData.gnext_offworkedatanyjobs_fol_theinj;
			this.owneridyominame = initData.owneridyominame;
			this.gnext_employingagencyheadzip = initData.gnext_employingagencyheadzip;
			this._gnext_claimid_value = initData._gnext_claimid_value;
			this.gnext_authorizedtorepresenttheofficername = initData.gnext_authorizedtorepresenttheofficername;
			this.gnext_claimidname = initData.gnext_claimidname;
			this.gnext_filingextensionreceived = initData.gnext_filingextensionreceived;
			this.gnext_grossnegligenceexplanation = initData.gnext_grossnegligenceexplanation;
			this.gnext_injurytypechemicals = initData.gnext_injurytypechemicals;
			this.gnext_applicationtypename = initData.gnext_applicationtypename;
			this.gnext_submitted = initData.gnext_submitted;
			this.gnext_digitallysign = initData.gnext_digitallysign;
			this.gnext_toxicologyanalysis = initData.gnext_toxicologyanalysis;
			this.gnext_undergoindependentmedicalexpertreviewname = initData.gnext_undergoindependentmedicalexpertreviewname;
			this.overriddencreatedon = initData.overriddencreatedon;
			this.gnext_applicantrelationshipname = initData.gnext_applicantrelationshipname;
			this.gnext_psoidname = initData.gnext_psoidname;
			this.gnext_determinedstatelineofdutydeathbenefitsname = initData.gnext_determinedstatelineofdutydeathbenefitsname;
			this.gnext_otherbenefitsdeterminedname = initData.gnext_otherbenefitsdeterminedname;
			this.gnext_officerhadchildrenpreviousrelationship = initData.gnext_officerhadchildrenpreviousrelationship;
			this.gnext_injurytypefiresmokeinhalationname = initData.gnext_injurytypefiresmokeinhalationname;
			this.gnext_bypasspreapplicationdate = initData.gnext_bypasspreapplicationdate;
			this.gnext_injurytypechemicalsname = initData.gnext_injurytypechemicalsname;
			this.gnext_psorecordcreatedname = initData.gnext_psorecordcreatedname;
			this.gnext_statename = initData.gnext_statename;
			this.gnext_nootherbenefitsfiled = initData.gnext_nootherbenefitsfiled;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.gnext_indicationofvoluntaryintoxicationname = initData.gnext_indicationofvoluntaryintoxicationname;
			this.gnext_publicsafetyofficercity = initData.gnext_publicsafetyofficercity;
			this.gnext_psoparentaddress2 = initData.gnext_psoparentaddress2;
			this.gnext_numberoftimesmarried = initData.gnext_numberoftimesmarried;
			this.gnext_psoparentaddress1 = initData.gnext_psoparentaddress1;
			this.gnext_requireddocumentsuploadedorjustified = initData.gnext_requireddocumentsuploadedorjustified;
			this.gnext_publicsafetyofficerdateofmedicalretiremen = initData.gnext_publicsafetyofficerdateofmedicalretiremen;
			this.gnext_claimantidname = initData.gnext_claimantidname;
			this.gnext_applicantrelationshiptothepso = initData.gnext_applicantrelationshiptothepso;
			this.gnext_nationalfallenfirefightersfoundation_wfs = initData.gnext_nationalfallenfirefightersfoundation_wfs;
			this.gnext_employingagencyheadtitle = initData.gnext_employingagencyheadtitle;
			this.gnext_indicationofmisconductname = initData.gnext_indicationofmisconductname;
			this.gnext_psoparentcity = initData.gnext_psoparentcity;
			this.gnext_numberoftimesmarriedname = initData.gnext_numberoftimesmarriedname;
			this.gnext_medicalquestionnairecompletedbyphysician = initData.gnext_medicalquestionnairecompletedbyphysician;
			this.gnext_dcretirementanddisabilityfinalname = initData.gnext_dcretirementanddisabilityfinalname;
			this.statuscodename = initData.statuscodename;
			this.gnext_injurytypebullets = initData.gnext_injurytypebullets;
			this.gnext_publicsafetyofficeremailaddress = initData.gnext_publicsafetyofficeremailaddress;
			this._processid_value = initData._processid_value;
			this.modifiedon = initData.modifiedon;
			this.gnext_hasofficerreceivedvocationaltrainingname = initData.gnext_hasofficerreceivedvocationaltrainingname;
			this.gnext_filingextensionreviewed = initData.gnext_filingextensionreviewed;
			this.gnext_applicanttype = initData.gnext_applicanttype;
			this.gnext_publicsafetyofficeraddressline1 = initData.gnext_publicsafetyofficeraddressline1;
			this.gnext_psonumberofchildrenattimeofinjury = initData.gnext_psonumberofchildrenattimeofinjury;
			this.gnext_dcretirementanddisabilityfinal = initData.gnext_dcretirementanddisabilityfinal;
			this.gnext_injurytypebulletsname = initData.gnext_injurytypebulletsname;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.gnext_applicationreviewedtimelyname = initData.gnext_applicationreviewedtimelyname;
			this.gnext_officermedicallyretiredname = initData.gnext_officermedicallyretiredname;
			this.gnext_applicationstage = initData.gnext_applicationstage;
			this.gnext_applicationsubmitted = initData.gnext_applicationsubmitted;
			this.gnext_hastheofficerreceivedanyformalvocationalo = initData.gnext_hastheofficerreceivedanyformalvocationalo;
			this.gnext_applicanteditrequired = initData.gnext_applicanteditrequired;
			this.createdby = initData.createdby;
			this.gnext_medicalquestionnairecompletedbyphysicianname = initData.gnext_medicalquestionnairecompletedbyphysicianname;
			this.gnext_officerhadsurvivingparents = initData.gnext_officerhadsurvivingparents;
			this.gnext_hasofficerreceivedvocationaltraining = initData.gnext_hasofficerreceivedvocationaltraining;
			this.gnext_applicationreviewedtimely = initData.gnext_applicationreviewedtimely;
			this._gnext_claimantid_value = initData._gnext_claimantid_value;
			
            this.id = initData.gnext_applicationid;
        }
    }
	
    /** @description Collection interface for gnext_determinationworksheetfield
     */  
	export interface IGnext_determinationworksheetfields extends IRetrieveMultipleData<Ignext_determinationworksheetfield> { }
    /** @description WebAPI interface for gnext_determinationworksheetfield
     */  
    export interface Ignext_determinationworksheetfield {
        [key: string]: string | number
        createdonbehalfbyyominame?: string
		modifiedonbehalfby?: string
		gnext_determinationworksheetfieldid?: string
		statecode?: number
		gnext_applicationtype?: string
		createdon?: string
		gnext_entitynameparta?: string
		gnext_entitynamepartb?: string
		gnext_fieldnamepartb?: string
		gnext_description?: string
		gnext_fieldnameparta?: string
		owninguser?: string
		createdonbehalfby?: string
		gnext_sortorder?: number
		importsequencenumber?: number
		versionnumber?: number
		utcconversiontimezonecode?: number
		createdbyyominame?: string
		owningbusinessunit?: string
		modifiedbyname?: string
		owningteam?: string
		modifiedby?: string
		modifiedbyyominame?: string
		timezoneruleversionnumber?: number
		owneridtype?: string
		statuscodename?: number
		gnext_applicationtypename?: number
		owneridyominame?: string
		modifiedon?: string
		statuscode?: string
		modifiedonbehalfbyyominame?: string
		statecodename?: number
		createdbyname?: string
		gnext_label?: string
		createdonbehalfbyname?: string
		createdby?: string
		modifiedonbehalfbyname?: string
		owneridname?: string
		_ownerid_value?: string
		overriddencreatedon?: string
		
    }
    /** @description Form Helper Class for gnext_determinationworksheetfield
     */ 
	export class gnext_determinationworksheetfieldForm {
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public gnext_determinationworksheetfieldid: string = "gnext_determinationworksheetfieldid";
		public statecode: string = "statecode";
		public gnext_applicationtype: string = "gnext_applicationtype";
		public createdon: string = "createdon";
		public gnext_entitynameparta: string = "gnext_entitynameparta";
		public gnext_entitynamepartb: string = "gnext_entitynamepartb";
		public gnext_fieldnamepartb: string = "gnext_fieldnamepartb";
		public gnext_description: string = "gnext_description";
		public gnext_fieldnameparta: string = "gnext_fieldnameparta";
		public owninguser: string = "owninguser";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_sortorder: string = "gnext_sortorder";
		public importsequencenumber: string = "importsequencenumber";
		public versionnumber: string = "versionnumber";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public createdbyyominame: string = "createdbyyominame";
		public owningbusinessunit: string = "owningbusinessunit";
		public modifiedbyname: string = "modifiedbyname";
		public owningteam: string = "owningteam";
		public modifiedby: string = "modifiedby";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public owneridtype: string = "owneridtype";
		public statuscodename: string = "statuscodename";
		public gnext_applicationtypename: string = "gnext_applicationtypename";
		public owneridyominame: string = "owneridyominame";
		public modifiedon: string = "modifiedon";
		public statuscode: string = "statuscode";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public statecodename: string = "statecodename";
		public createdbyname: string = "createdbyname";
		public gnext_label: string = "gnext_label";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public createdby: string = "createdby";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public owneridname: string = "owneridname";
		public ownerid: string = "ownerid";
		public overriddencreatedon: string = "overriddencreatedon";
		
	}
    /** @description Web API attribute string helper class for gnext_determinationworksheetfield
     */ 
    export class gnext_determinationworksheetfieldWebAPI {
        public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public gnext_determinationworksheetfieldid: string = "gnext_determinationworksheetfieldid";
		public statecode: string = "statecode";
		public gnext_applicationtype: string = "gnext_applicationtype";
		public createdon: string = "createdon";
		public gnext_entitynameparta: string = "gnext_entitynameparta";
		public gnext_entitynamepartb: string = "gnext_entitynamepartb";
		public gnext_fieldnamepartb: string = "gnext_fieldnamepartb";
		public gnext_description: string = "gnext_description";
		public gnext_fieldnameparta: string = "gnext_fieldnameparta";
		public owninguser: string = "owninguser";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_sortorder: string = "gnext_sortorder";
		public importsequencenumber: string = "importsequencenumber";
		public versionnumber: string = "versionnumber";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public createdbyyominame: string = "createdbyyominame";
		public owningbusinessunit: string = "owningbusinessunit";
		public modifiedbyname: string = "modifiedbyname";
		public owningteam: string = "owningteam";
		public modifiedby: string = "modifiedby";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public owneridtype: string = "owneridtype";
		public statuscodename: string = "statuscodename";
		public gnext_applicationtypename: string = "gnext_applicationtypename";
		public owneridyominame: string = "owneridyominame";
		public modifiedon: string = "modifiedon";
		public statuscode: string = "statuscode";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public statecodename: string = "statecodename";
		public createdbyname: string = "createdbyname";
		public gnext_label: string = "gnext_label";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public createdby: string = "createdby";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public owneridname: string = "owneridname";
		public _ownerid_value: string = "_ownerid_value";
		public overriddencreatedon: string = "overriddencreatedon";
			
    }
    /** @description Instantiates a gnext_determinationworksheetfield Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class gnext_determinationworksheetfield extends Entity {
		[key: string]: string | number
        public route: string = "gnext_determinationworksheetfields";
		public createdonbehalfbyyominame: string;
		public modifiedonbehalfby: string;
		public gnext_determinationworksheetfieldid: string;
		public statecode: number;
		public gnext_applicationtype: string;
		public createdon: string;
		public gnext_entitynameparta: string;
		public gnext_entitynamepartb: string;
		public gnext_fieldnamepartb: string;
		public gnext_description: string;
		public gnext_fieldnameparta: string;
		public owninguser: string;
		public createdonbehalfby: string;
		public gnext_sortorder: number;
		public importsequencenumber: number;
		public versionnumber: number;
		public utcconversiontimezonecode: number;
		public createdbyyominame: string;
		public owningbusinessunit: string;
		public modifiedbyname: string;
		public owningteam: string;
		public modifiedby: string;
		public modifiedbyyominame: string;
		public timezoneruleversionnumber: number;
		public owneridtype: string;
		public statuscodename: number;
		public gnext_applicationtypename: number;
		public owneridyominame: string;
		public modifiedon: string;
		public statuscode: string;
		public modifiedonbehalfbyyominame: string;
		public statecodename: number;
		public createdbyname: string;
		public gnext_label: string;
		public createdonbehalfbyname: string;
		public createdby: string;
		public modifiedonbehalfbyname: string;
		public owneridname: string;
		public _ownerid_value: string;
		public overriddencreatedon: string;
			
        
        constructor(initData?: Ignext_determinationworksheetfield) {
			super("gnext_determinationworksheetfields");        
            if (initData == undefined) return;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.gnext_determinationworksheetfieldid = initData.gnext_determinationworksheetfieldid;
			this.statecode = initData.statecode;
			this.gnext_applicationtype = initData.gnext_applicationtype;
			this.createdon = initData.createdon;
			this.gnext_entitynameparta = initData.gnext_entitynameparta;
			this.gnext_entitynamepartb = initData.gnext_entitynamepartb;
			this.gnext_fieldnamepartb = initData.gnext_fieldnamepartb;
			this.gnext_description = initData.gnext_description;
			this.gnext_fieldnameparta = initData.gnext_fieldnameparta;
			this.owninguser = initData.owninguser;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.gnext_sortorder = initData.gnext_sortorder;
			this.importsequencenumber = initData.importsequencenumber;
			this.versionnumber = initData.versionnumber;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.createdbyyominame = initData.createdbyyominame;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.modifiedbyname = initData.modifiedbyname;
			this.owningteam = initData.owningteam;
			this.modifiedby = initData.modifiedby;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.owneridtype = initData.owneridtype;
			this.statuscodename = initData.statuscodename;
			this.gnext_applicationtypename = initData.gnext_applicationtypename;
			this.owneridyominame = initData.owneridyominame;
			this.modifiedon = initData.modifiedon;
			this.statuscode = initData.statuscode;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.statecodename = initData.statecodename;
			this.createdbyname = initData.createdbyname;
			this.gnext_label = initData.gnext_label;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.createdby = initData.createdby;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.owneridname = initData.owneridname;
			this._ownerid_value = initData._ownerid_value;
			this.overriddencreatedon = initData.overriddencreatedon;
			
            this.id = initData.gnext_determinationworksheetfieldid;
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
	
    /** @description Collection interface for gnext_pso_deathreport
     */  
	export interface IGnext_pso_deathreports extends IRetrieveMultipleData<Ignext_pso_deathreport> { }
    /** @description WebAPI interface for gnext_pso_deathreport
     */  
    export interface Ignext_pso_deathreport {
        [key: string]: string | number
        gnext_agencyheadaddressline2?: string
		gnext_injurytypephysicalblows?: string
		gnext_nootherbenefitsdeterminedname?: number
		gnext_authorizedcommuting?: string
		gnext_injurytypefiresmokeinhalation?: string
		gnext_agencyheadaddressline1?: string
		gnext_agencyhead_deathreportidname?: string
		gnext_officersemailaddress?: string
		gnext_officerintenttobringaboutownharm?: string
		gnext_injurycausedbyintentionalmisconductdescri?: string
		gnext_filedsept11victimcompfund?: string
		owninguser?: string
		gnext_toxicologyanalysisperformedname?: number
		overriddencreatedon?: string
		gnext_agencyheadprefix?: string
		statuscodename?: number
		gnext_officerservingiasvolunteername?: number
		gnext_determineworkerscompensationname?: number
		gnext_addressline1?: string
		gnext_officerengagedinauthorizedactivitiesname?: number
		gnext_agencyjurisdictionname?: number
		gnext_authorizedcommutingname?: number
		gnext_officeremployedinnoncivilianmilitarycap?: string
		gnext_officersssn?: string
		gnext_injurytypeothername?: number
		gnext_atthetimeofinurythatresultedindeath?: string
		gnext_injurytypeoccupationaldisease?: string
		gnext_filedsocialsecurity?: string
		gnext_officerslastname?: string
		gnext_injurytypevasularrupturename?: number
		gnext_state_other?: string
		gnext_partbsubmissionstatusname?: number
		gnext_injurytypebullets?: string
		gnext_filedworkmanscompensation?: string
		gnext_indicationofharmcontributedbyexplanation?: string
		gnext_agencyjurisdicationifother?: string
		gnext_employingagencyphonenumber?: string
		gnext_otherbenefitsdeterminedname?: number
		createdby?: string
		gnext_agencyheadinfosameasemployingagency?: string
		gnext_typeofinjuryname?: number
		gnext_toxicologyanalysisperformed_wfs?: string
		gnext_nootherbenefitsdetermined?: string
		gnext_psareportidname?: string
		gnext_indicationofvoluntaryintoxication_wfsname?: number
		gnext_psareporttype?: string
		gnext_iscontactinformationforagencyheadthesame?: string
		createdbyyominame?: string
		gnext_datesignedcalculated?: string
		gnext_extraordinaryrequestbyemployingagency?: string
		gnext_personalvehicleagencyrequirestoworkname?: number
		gnext_psareportidyominame?: string
		owningbusinessunit?: string
		gnext_authorizedtorepresent?: string
		gnext_indicationofvoluntaryintoxicationname?: number
		gnext_filedfederalemployeescompensationactname?: number
		gnext_describeapplicanttypeother?: string
		gnext_officerdateofmedicalretirement?: string
		gnext_travelingbetweenhomeinworkvehicle?: string
		_gnext_agencyhead_deathreportid_value?: string
		gnext_datesigned?: string
		gnext_injurytypeviralinfectionname?: number
		gnext_numberofotherbeneficiaries?: string
		gnext_officergrossnegligence_wfsname?: number
		gnext_injurycasuedbyintentionalmisconduct_wfsname?: number
		gnext_agencyheadzipcode?: string
		gnext_determinedworkerscompensationname?: number
		statuscode?: string
		gnext_agencyclassificationname?: number
		statecode?: number
		gnext_filedsept11victimcompfundname?: number
		gnext_agencypointofcontactaddressline1?: string
		gnext_injurytypefiresmokeinhalationname?: number
		gnext_uploadstatementofcircumstance?: string
		gnext_injurytypeinfectiousdisease?: string
		gnext_currentdatetime?: string
		gnext_publicsafetyofficerstitle?: string
		gnext_iscontactinformationforagencyheadthesamename?: number
		gnext_determinedsocialsecurityname?: number
		gnext_agencypocstate?: string
		gnext_pso_deathreportid?: string
		statecodename?: number
		gnext_agencyheadprefixother?: string
		gnext_toxicologyanalysisperformed?: string
		gnext_deathreportstage?: string
		gnext_agencypointofcontactlastname?: string
		gnext_unvalidateddocsname?: number
		gnext_personalvehicleagencyrequirestowork?: string
		gnext_nameofemployingagencyorganizationorunit?: string
		modifiedon?: string
		_gnext_psareportid_value?: string
		gnext_agencyheadcountry?: string
		gnext_unvalidateddocs?: string
		gnext_travelingbetweenhomeinworkvehiclename?: number
		gnext_determinedfederalemployeescompactname?: number
		gnext_filedmedicalretirementname?: number
		gnext_agencyheadstate?: string
		gnext_createpsorecordname?: number
		createdon?: string
		gnext_officerprefixother?: string
		gnext_filedstatelineofdutydeathbenefits?: string
		gnext_filedsocialsecurityname?: number
		gnext_officersalternatephonenumber?: string
		modifiedonbehalfbyyominame?: string
		versionnumber?: number
		gnext_agencyppointofcontactcity?: string
		gnext_agencyclassificationifother?: string
		gnext_name?: string
		gnext_agencypointofcontactfirstname?: string
		createdonbehalfby?: string
		gnext_filedworkmanscompensationname?: number
		gnext_injurycasuedbyintentionalmisconductname?: number
		gnext_injurytyperadiationname?: number
		gnext_officerengagedinactivityauthorizedtoengag?: string
		gnext_agencyheademailaddress?: string
		gnext_injurycasuedbyintentionalmisconduct?: string
		gnext_employingagencyalternatephonenumber?: string
		gnext_agencypointofcontactcountry?: string
		gnext_agencypointofcontactalternatephonenumber?: string
		gnext_accountidyominame?: string
		_processid_value?: string
		gnext_agencyheadsuffix?: string
		owneridyominame?: string
		gnext_deathreportstagename?: number
		gnext_agencyjurisdiction?: string
		gnext_injurytypeclimaticconditionsname?: number
		gnext_agencypointofcontactstate?: string
		timezoneruleversionnumber?: number
		gnext_injurytypebulletsname?: number
		_gnext_psadeathreporterid_value?: string
		_gnext_accountid_value?: string
		gnext_agencypocstate_other?: string
		modifiedonbehalfby?: string
		gnext_agencypocinfosameasemployingagencyname?: number
		gnext_determinedsept11victimcompfundname?: number
		gnext_ifotherengagementtype?: string
		gnext_officerservingiasvolunteer?: string
		gnext_officerprefix?: string
		gnext_agencypointofcontactzip?: string
		gnext_injurycasuedbyintentionalmisconduct_wfs?: string
		gnext_officersdateofinjuryordeath?: string
		gnext_injurytypechemicals?: string
		gnext_officerservingascontractor?: string
		gnext_injurytypeheartattackname?: number
		traversedpath?: string
		gnext_determinedmedicalretirementname?: number
		gnext_officerintenttobringaboutownharm_wfs?: string
		gnext_officerengagedinactivityauthorizedtoenganame?: number
		gnext_injurytypephysicalblowsname?: number
		createdonbehalfbyname?: string
		gnext_agencypocprefix?: string
		gnext_filedstatelineofdutydeathbenefitsname?: number
		gnext_agencypocprefixname?: number
		gnext_agencyclassification?: string
		gnext_injurytypeother?: string
		owneridtype?: string
		gnext_officersfirstname?: string
		gnext_agencypointofcontactjobtitle?: string
		gnext_determineddcretirementanddisabilityact?: string
		gnext_grossnegligenceexplanation?: string
		gnext_agencyheadalternatephonenumber?: string
		gnext_officerintenttobringaboutownharm_wfsname?: number
		gnext_officerprefixname?: number
		gnext_describeotherfiled?: string
		owneridname?: string
		modifiedonbehalfbyname?: string
		gnext_agencypointofcontactaddressline2?: string
		gnext_injurytypeheartattack?: string
		gnext_agencypocprefixother?: string
		gnext_agencyheadstate_other?: string
		gnext_agencyheadfirstname?: string
		gnext_officersdateofbirth?: string
		gnext_whatwasthedateofinjury?: string
		gnext_injurytypevasularrupture?: string
		gnext_officersuffix?: string
		gnext_isinjurybasedonaseptember112001exposurename?: number
		owningteam?: string
		gnext_accountidname?: string
		gnext_officerengagedinpublicssafetyortraining?: string
		gnext_statementofcircumstance?: string
		gnext_country?: string
		gnext_upload24houractivityreport?: string
		gnext_injurytypeexplosivesname?: number
		gnext_injurytypevehicleboatairplanehelicoptername?: number
		gnext_dutystatusother?: string
		gnext_certificationofapplication?: string
		gnext_numberofotherbeneficiariesname?: number
		gnext_injurytypeelectricityname?: number
		gnext_indicationofvoluntaryintoxication_wfs?: string
		gnext_typeofinjury?: string
		gnext_agencyheadprefixname?: number
		gnext_nootherbenefitsfiled?: string
		gnext_psadeathreporteridname?: string
		gnext_determinedsocialsecurity?: string
		gnext_officerintenttoselfharmexplanation?: string
		gnext_createpsorecord?: string
		gnext_toxicologyanalysisperformed_wfsname?: number
		createdonbehalfbyyominame?: string
		gnext_determinedworkerscompensation?: string
		gnext_determineddcretirementanddisabilityactname?: number
		gnext_uploadstatementofcircumstancename?: number
		gnext_partbsubmissionstatus?: string
		gnext_zipcode?: string
		_ownerid_value?: string
		gnext_fileddcretirementanddisabilityactname?: number
		gnext_injurytypestressorstrainname?: number
		gnext_actionswithinprimaryjurisdiction?: string
		gnext_officerintenttobringaboutownharmname?: number
		gnext_city?: string
		gnext_otherbenefitsfiled?: string
		gnext_dutystatus?: string
		gnext_injurytypeexplosives?: string
		gnext_causeofinjuryother?: string
		gnext_determinedfederalemployeescompact?: string
		_gnext_psorecordid_value?: string
		gnext_employingagencyemailaddress?: string
		gnext_injoryordeathcausedbybeneficiaryname?: number
		gnext_isinjurybasedonaseptember112001exposure?: string
		gnext_agencypointofcontactphonenumber?: string
		gnext_dutystatusname?: number
		gnext_state?: string
		gnext_requireddocumentsuploadedorjustified?: string
		gnext_determinedstatelineofdutydeathbenefitsname?: number
		createdbyname?: string
		gnext_authorizedtorepresentname?: number
		gnext_officerengagedinauthorizedactivities?: string
		gnext_injurytypeelectricity?: string
		gnext_injurytypevehicleboatairplanehelicopter?: string
		modifiedbyyominame?: string
		gnext_nootherbenefitsfiledname?: number
		gnext_filedfederalemployeescompensationact?: string
		gnext_agencypocinfosameasemployingagency?: string
		gnext_filedworkerscompensationname?: number
		gnext_officergrossnegligencename?: number
		gnext_agencypointofcontactemailaddress?: string
		gnext_officeremployedinnoncivilianmilitarycapname?: number
		gnext_agencyheadinfosameasemployingagencyname?: number
		gnext_agencyheadlastname?: string
		gnext_injurytypestrokename?: number
		gnext_readytosubmitapplication?: string
		gnext_injurytypeclimaticconditions?: string
		gnext_addressline2?: string
		gnext_officersmiddlename?: string
		gnext_describeotherdetermination?: string
		gnext_officerengagedinpublicssafetyortrainingname?: number
		gnext_datereceived?: string
		gnext_agencyheadjobtitle?: string
		gnext_specifyifotherinjurytype?: string
		_stageid_value?: string
		utcconversiontimezonecode?: number
		gnext_injurytypesharpinstrumentsbluntobjectsname?: number
		gnext_determinedstatelineofdutydeathbenefits?: string
		gnext_determinedmedicalretirement?: string
		gnext_officergrossnegligence?: string
		gnext_filedmedicalretirement?: string
		gnext_officerservingascontractorname?: number
		gnext_upload24houractivityreportname?: number
		gnext_certificationofapplicationname?: number
		gnext_agencypocsuffix?: string
		gnext_injurytypeoccupationaldiseasename?: number
		gnext_actionswithinprimaryjurisdictionname?: number
		importsequencenumber?: number
		gnext_otherbenefitsfiledname?: number
		gnext_officersphonenumber?: string
		gnext_officeremployedinnoncivilianmilita_wfsname?: number
		gnext_psareporttypename?: number
		gnext_applicanttype?: string
		gnext_officergrossnegligence_wfs?: string
		gnext_injurytypeinfectiousdiseasename?: number
		gnext_officersdateofmedicalretirement?: string
		gnext_determineworkerscompensation?: string
		gnext_readytosubmitapplicationname?: number
		gnext_atthetimeofinurythatresultedindeathname?: number
		gnext_indicationofvoluntaryintoxicationexplanat?: string
		gnext_injoryordeathcausedbybeneficiary?: string
		gnext_psorecordidname?: string
		gnext_applicanttypename?: number
		gnext_psadeathreporteridyominame?: string
		gnext_injurytypesharpinstrumentsbluntobjects?: string
		gnext_datesubmittedcalculated?: string
		gnext_injurytyperadiation?: string
		gnext_agencyheadstatename?: number
		modifiedbyname?: string
		gnext_statename?: number
		gnext_injurytypestroke?: string
		gnext_determinedsept11victimcompfund?: string
		gnext_officeremployedinnoncivilianmilita_wfs?: string
		gnext_injurytypechemicalsname?: number
		gnext_otherbenefitsdetermined?: string
		gnext_officerengagedinactivityauthorizedtoenga?: string
		gnext_fileddcretirementanddisabilityact?: string
		gnext_injurytypestressorstrain?: string
		gnext_officeremployedinnonciviliancapexplanatio?: string
		modifiedby?: string
		gnext_filedworkerscompensation?: string
		gnext_agencyheadcity?: string
		gnext_agencyheadphonenumber?: string
		gnext_agencypocstatename?: number
		gnext_indicationofvoluntaryintoxication?: string
		gnext_injurytypeviralinfection?: string
		gnext_extraordinaryrequestbyemployingagencyname?: number
		
    }
    /** @description Form Helper Class for gnext_pso_deathreport
     */ 
	export class gnext_pso_deathreportForm {
		public gnext_agencyheadaddressline2: string = "gnext_agencyheadaddressline2";
		public gnext_injurytypephysicalblows: string = "gnext_injurytypephysicalblows";
		public gnext_nootherbenefitsdeterminedname: string = "gnext_nootherbenefitsdeterminedname";
		public gnext_authorizedcommuting: string = "gnext_authorizedcommuting";
		public gnext_injurytypefiresmokeinhalation: string = "gnext_injurytypefiresmokeinhalation";
		public gnext_agencyheadaddressline1: string = "gnext_agencyheadaddressline1";
		public gnext_agencyhead_deathreportidname: string = "gnext_agencyhead_deathreportidname";
		public gnext_officersemailaddress: string = "gnext_officersemailaddress";
		public gnext_officerintenttobringaboutownharm: string = "gnext_officerintenttobringaboutownharm";
		public gnext_injurycausedbyintentionalmisconductdescri: string = "gnext_injurycausedbyintentionalmisconductdescri";
		public gnext_filedsept11victimcompfund: string = "gnext_filedsept11victimcompfund";
		public owninguser: string = "owninguser";
		public gnext_toxicologyanalysisperformedname: string = "gnext_toxicologyanalysisperformedname";
		public overriddencreatedon: string = "overriddencreatedon";
		public gnext_agencyheadprefix: string = "gnext_agencyheadprefix";
		public statuscodename: string = "statuscodename";
		public gnext_officerservingiasvolunteername: string = "gnext_officerservingiasvolunteername";
		public gnext_determineworkerscompensationname: string = "gnext_determineworkerscompensationname";
		public gnext_addressline1: string = "gnext_addressline1";
		public gnext_officerengagedinauthorizedactivitiesname: string = "gnext_officerengagedinauthorizedactivitiesname";
		public gnext_agencyjurisdictionname: string = "gnext_agencyjurisdictionname";
		public gnext_authorizedcommutingname: string = "gnext_authorizedcommutingname";
		public gnext_officeremployedinnoncivilianmilitarycap: string = "gnext_officeremployedinnoncivilianmilitarycap";
		public gnext_officersssn: string = "gnext_officersssn";
		public gnext_injurytypeothername: string = "gnext_injurytypeothername";
		public gnext_atthetimeofinurythatresultedindeath: string = "gnext_atthetimeofinurythatresultedindeath";
		public gnext_injurytypeoccupationaldisease: string = "gnext_injurytypeoccupationaldisease";
		public gnext_filedsocialsecurity: string = "gnext_filedsocialsecurity";
		public gnext_officerslastname: string = "gnext_officerslastname";
		public gnext_injurytypevasularrupturename: string = "gnext_injurytypevasularrupturename";
		public gnext_state_other: string = "gnext_state_other";
		public gnext_partbsubmissionstatusname: string = "gnext_partbsubmissionstatusname";
		public gnext_injurytypebullets: string = "gnext_injurytypebullets";
		public gnext_filedworkmanscompensation: string = "gnext_filedworkmanscompensation";
		public gnext_indicationofharmcontributedbyexplanation: string = "gnext_indicationofharmcontributedbyexplanation";
		public gnext_agencyjurisdicationifother: string = "gnext_agencyjurisdicationifother";
		public gnext_employingagencyphonenumber: string = "gnext_employingagencyphonenumber";
		public gnext_otherbenefitsdeterminedname: string = "gnext_otherbenefitsdeterminedname";
		public createdby: string = "createdby";
		public gnext_agencyheadinfosameasemployingagency: string = "gnext_agencyheadinfosameasemployingagency";
		public gnext_typeofinjuryname: string = "gnext_typeofinjuryname";
		public gnext_toxicologyanalysisperformed_wfs: string = "gnext_toxicologyanalysisperformed_wfs";
		public gnext_nootherbenefitsdetermined: string = "gnext_nootherbenefitsdetermined";
		public gnext_psareportidname: string = "gnext_psareportidname";
		public gnext_indicationofvoluntaryintoxication_wfsname: string = "gnext_indicationofvoluntaryintoxication_wfsname";
		public gnext_psareporttype: string = "gnext_psareporttype";
		public gnext_iscontactinformationforagencyheadthesame: string = "gnext_iscontactinformationforagencyheadthesame";
		public createdbyyominame: string = "createdbyyominame";
		public gnext_datesignedcalculated: string = "gnext_datesignedcalculated";
		public gnext_extraordinaryrequestbyemployingagency: string = "gnext_extraordinaryrequestbyemployingagency";
		public gnext_personalvehicleagencyrequirestoworkname: string = "gnext_personalvehicleagencyrequirestoworkname";
		public gnext_psareportidyominame: string = "gnext_psareportidyominame";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_authorizedtorepresent: string = "gnext_authorizedtorepresent";
		public gnext_indicationofvoluntaryintoxicationname: string = "gnext_indicationofvoluntaryintoxicationname";
		public gnext_filedfederalemployeescompensationactname: string = "gnext_filedfederalemployeescompensationactname";
		public gnext_describeapplicanttypeother: string = "gnext_describeapplicanttypeother";
		public gnext_officerdateofmedicalretirement: string = "gnext_officerdateofmedicalretirement";
		public gnext_travelingbetweenhomeinworkvehicle: string = "gnext_travelingbetweenhomeinworkvehicle";
		public gnext_agencyhead_deathreportid: string = "gnext_agencyhead_deathreportid";
		public gnext_datesigned: string = "gnext_datesigned";
		public gnext_injurytypeviralinfectionname: string = "gnext_injurytypeviralinfectionname";
		public gnext_numberofotherbeneficiaries: string = "gnext_numberofotherbeneficiaries";
		public gnext_officergrossnegligence_wfsname: string = "gnext_officergrossnegligence_wfsname";
		public gnext_injurycasuedbyintentionalmisconduct_wfsname: string = "gnext_injurycasuedbyintentionalmisconduct_wfsname";
		public gnext_agencyheadzipcode: string = "gnext_agencyheadzipcode";
		public gnext_determinedworkerscompensationname: string = "gnext_determinedworkerscompensationname";
		public statuscode: string = "statuscode";
		public gnext_agencyclassificationname: string = "gnext_agencyclassificationname";
		public statecode: string = "statecode";
		public gnext_filedsept11victimcompfundname: string = "gnext_filedsept11victimcompfundname";
		public gnext_agencypointofcontactaddressline1: string = "gnext_agencypointofcontactaddressline1";
		public gnext_injurytypefiresmokeinhalationname: string = "gnext_injurytypefiresmokeinhalationname";
		public gnext_uploadstatementofcircumstance: string = "gnext_uploadstatementofcircumstance";
		public gnext_injurytypeinfectiousdisease: string = "gnext_injurytypeinfectiousdisease";
		public gnext_currentdatetime: string = "gnext_currentdatetime";
		public gnext_publicsafetyofficerstitle: string = "gnext_publicsafetyofficerstitle";
		public gnext_iscontactinformationforagencyheadthesamename: string = "gnext_iscontactinformationforagencyheadthesamename";
		public gnext_determinedsocialsecurityname: string = "gnext_determinedsocialsecurityname";
		public gnext_agencypocstate: string = "gnext_agencypocstate";
		public gnext_pso_deathreportid: string = "gnext_pso_deathreportid";
		public statecodename: string = "statecodename";
		public gnext_agencyheadprefixother: string = "gnext_agencyheadprefixother";
		public gnext_toxicologyanalysisperformed: string = "gnext_toxicologyanalysisperformed";
		public gnext_deathreportstage: string = "gnext_deathreportstage";
		public gnext_agencypointofcontactlastname: string = "gnext_agencypointofcontactlastname";
		public gnext_unvalidateddocsname: string = "gnext_unvalidateddocsname";
		public gnext_personalvehicleagencyrequirestowork: string = "gnext_personalvehicleagencyrequirestowork";
		public gnext_nameofemployingagencyorganizationorunit: string = "gnext_nameofemployingagencyorganizationorunit";
		public modifiedon: string = "modifiedon";
		public gnext_psareportid: string = "gnext_psareportid";
		public gnext_agencyheadcountry: string = "gnext_agencyheadcountry";
		public gnext_unvalidateddocs: string = "gnext_unvalidateddocs";
		public gnext_travelingbetweenhomeinworkvehiclename: string = "gnext_travelingbetweenhomeinworkvehiclename";
		public gnext_determinedfederalemployeescompactname: string = "gnext_determinedfederalemployeescompactname";
		public gnext_filedmedicalretirementname: string = "gnext_filedmedicalretirementname";
		public gnext_agencyheadstate: string = "gnext_agencyheadstate";
		public gnext_createpsorecordname: string = "gnext_createpsorecordname";
		public createdon: string = "createdon";
		public gnext_officerprefixother: string = "gnext_officerprefixother";
		public gnext_filedstatelineofdutydeathbenefits: string = "gnext_filedstatelineofdutydeathbenefits";
		public gnext_filedsocialsecurityname: string = "gnext_filedsocialsecurityname";
		public gnext_officersalternatephonenumber: string = "gnext_officersalternatephonenumber";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public versionnumber: string = "versionnumber";
		public gnext_agencyppointofcontactcity: string = "gnext_agencyppointofcontactcity";
		public gnext_agencyclassificationifother: string = "gnext_agencyclassificationifother";
		public gnext_name: string = "gnext_name";
		public gnext_agencypointofcontactfirstname: string = "gnext_agencypointofcontactfirstname";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_filedworkmanscompensationname: string = "gnext_filedworkmanscompensationname";
		public gnext_injurycasuedbyintentionalmisconductname: string = "gnext_injurycasuedbyintentionalmisconductname";
		public gnext_injurytyperadiationname: string = "gnext_injurytyperadiationname";
		public gnext_officerengagedinactivityauthorizedtoengag: string = "gnext_officerengagedinactivityauthorizedtoengag";
		public gnext_agencyheademailaddress: string = "gnext_agencyheademailaddress";
		public gnext_injurycasuedbyintentionalmisconduct: string = "gnext_injurycasuedbyintentionalmisconduct";
		public gnext_employingagencyalternatephonenumber: string = "gnext_employingagencyalternatephonenumber";
		public gnext_agencypointofcontactcountry: string = "gnext_agencypointofcontactcountry";
		public gnext_agencypointofcontactalternatephonenumber: string = "gnext_agencypointofcontactalternatephonenumber";
		public gnext_accountidyominame: string = "gnext_accountidyominame";
		public processid: string = "processid";
		public gnext_agencyheadsuffix: string = "gnext_agencyheadsuffix";
		public owneridyominame: string = "owneridyominame";
		public gnext_deathreportstagename: string = "gnext_deathreportstagename";
		public gnext_agencyjurisdiction: string = "gnext_agencyjurisdiction";
		public gnext_injurytypeclimaticconditionsname: string = "gnext_injurytypeclimaticconditionsname";
		public gnext_agencypointofcontactstate: string = "gnext_agencypointofcontactstate";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_injurytypebulletsname: string = "gnext_injurytypebulletsname";
		public gnext_psadeathreporterid: string = "gnext_psadeathreporterid";
		public gnext_accountid: string = "gnext_accountid";
		public gnext_agencypocstate_other: string = "gnext_agencypocstate_other";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public gnext_agencypocinfosameasemployingagencyname: string = "gnext_agencypocinfosameasemployingagencyname";
		public gnext_determinedsept11victimcompfundname: string = "gnext_determinedsept11victimcompfundname";
		public gnext_ifotherengagementtype: string = "gnext_ifotherengagementtype";
		public gnext_officerservingiasvolunteer: string = "gnext_officerservingiasvolunteer";
		public gnext_officerprefix: string = "gnext_officerprefix";
		public gnext_agencypointofcontactzip: string = "gnext_agencypointofcontactzip";
		public gnext_injurycasuedbyintentionalmisconduct_wfs: string = "gnext_injurycasuedbyintentionalmisconduct_wfs";
		public gnext_officersdateofinjuryordeath: string = "gnext_officersdateofinjuryordeath";
		public gnext_injurytypechemicals: string = "gnext_injurytypechemicals";
		public gnext_officerservingascontractor: string = "gnext_officerservingascontractor";
		public gnext_injurytypeheartattackname: string = "gnext_injurytypeheartattackname";
		public traversedpath: string = "traversedpath";
		public gnext_determinedmedicalretirementname: string = "gnext_determinedmedicalretirementname";
		public gnext_officerintenttobringaboutownharm_wfs: string = "gnext_officerintenttobringaboutownharm_wfs";
		public gnext_officerengagedinactivityauthorizedtoenganame: string = "gnext_officerengagedinactivityauthorizedtoenganame";
		public gnext_injurytypephysicalblowsname: string = "gnext_injurytypephysicalblowsname";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public gnext_agencypocprefix: string = "gnext_agencypocprefix";
		public gnext_filedstatelineofdutydeathbenefitsname: string = "gnext_filedstatelineofdutydeathbenefitsname";
		public gnext_agencypocprefixname: string = "gnext_agencypocprefixname";
		public gnext_agencyclassification: string = "gnext_agencyclassification";
		public gnext_injurytypeother: string = "gnext_injurytypeother";
		public owneridtype: string = "owneridtype";
		public gnext_officersfirstname: string = "gnext_officersfirstname";
		public gnext_agencypointofcontactjobtitle: string = "gnext_agencypointofcontactjobtitle";
		public gnext_determineddcretirementanddisabilityact: string = "gnext_determineddcretirementanddisabilityact";
		public gnext_grossnegligenceexplanation: string = "gnext_grossnegligenceexplanation";
		public gnext_agencyheadalternatephonenumber: string = "gnext_agencyheadalternatephonenumber";
		public gnext_officerintenttobringaboutownharm_wfsname: string = "gnext_officerintenttobringaboutownharm_wfsname";
		public gnext_officerprefixname: string = "gnext_officerprefixname";
		public gnext_describeotherfiled: string = "gnext_describeotherfiled";
		public owneridname: string = "owneridname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public gnext_agencypointofcontactaddressline2: string = "gnext_agencypointofcontactaddressline2";
		public gnext_injurytypeheartattack: string = "gnext_injurytypeheartattack";
		public gnext_agencypocprefixother: string = "gnext_agencypocprefixother";
		public gnext_agencyheadstate_other: string = "gnext_agencyheadstate_other";
		public gnext_agencyheadfirstname: string = "gnext_agencyheadfirstname";
		public gnext_officersdateofbirth: string = "gnext_officersdateofbirth";
		public gnext_whatwasthedateofinjury: string = "gnext_whatwasthedateofinjury";
		public gnext_injurytypevasularrupture: string = "gnext_injurytypevasularrupture";
		public gnext_officersuffix: string = "gnext_officersuffix";
		public gnext_isinjurybasedonaseptember112001exposurename: string = "gnext_isinjurybasedonaseptember112001exposurename";
		public owningteam: string = "owningteam";
		public gnext_accountidname: string = "gnext_accountidname";
		public gnext_officerengagedinpublicssafetyortraining: string = "gnext_officerengagedinpublicssafetyortraining";
		public gnext_statementofcircumstance: string = "gnext_statementofcircumstance";
		public gnext_country: string = "gnext_country";
		public gnext_upload24houractivityreport: string = "gnext_upload24houractivityreport";
		public gnext_injurytypeexplosivesname: string = "gnext_injurytypeexplosivesname";
		public gnext_injurytypevehicleboatairplanehelicoptername: string = "gnext_injurytypevehicleboatairplanehelicoptername";
		public gnext_dutystatusother: string = "gnext_dutystatusother";
		public gnext_certificationofapplication: string = "gnext_certificationofapplication";
		public gnext_numberofotherbeneficiariesname: string = "gnext_numberofotherbeneficiariesname";
		public gnext_injurytypeelectricityname: string = "gnext_injurytypeelectricityname";
		public gnext_indicationofvoluntaryintoxication_wfs: string = "gnext_indicationofvoluntaryintoxication_wfs";
		public gnext_typeofinjury: string = "gnext_typeofinjury";
		public gnext_agencyheadprefixname: string = "gnext_agencyheadprefixname";
		public gnext_nootherbenefitsfiled: string = "gnext_nootherbenefitsfiled";
		public gnext_psadeathreporteridname: string = "gnext_psadeathreporteridname";
		public gnext_determinedsocialsecurity: string = "gnext_determinedsocialsecurity";
		public gnext_officerintenttoselfharmexplanation: string = "gnext_officerintenttoselfharmexplanation";
		public gnext_createpsorecord: string = "gnext_createpsorecord";
		public gnext_toxicologyanalysisperformed_wfsname: string = "gnext_toxicologyanalysisperformed_wfsname";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public gnext_determinedworkerscompensation: string = "gnext_determinedworkerscompensation";
		public gnext_determineddcretirementanddisabilityactname: string = "gnext_determineddcretirementanddisabilityactname";
		public gnext_uploadstatementofcircumstancename: string = "gnext_uploadstatementofcircumstancename";
		public gnext_partbsubmissionstatus: string = "gnext_partbsubmissionstatus";
		public gnext_zipcode: string = "gnext_zipcode";
		public ownerid: string = "ownerid";
		public gnext_fileddcretirementanddisabilityactname: string = "gnext_fileddcretirementanddisabilityactname";
		public gnext_injurytypestressorstrainname: string = "gnext_injurytypestressorstrainname";
		public gnext_actionswithinprimaryjurisdiction: string = "gnext_actionswithinprimaryjurisdiction";
		public gnext_officerintenttobringaboutownharmname: string = "gnext_officerintenttobringaboutownharmname";
		public gnext_city: string = "gnext_city";
		public gnext_otherbenefitsfiled: string = "gnext_otherbenefitsfiled";
		public gnext_dutystatus: string = "gnext_dutystatus";
		public gnext_injurytypeexplosives: string = "gnext_injurytypeexplosives";
		public gnext_causeofinjuryother: string = "gnext_causeofinjuryother";
		public gnext_determinedfederalemployeescompact: string = "gnext_determinedfederalemployeescompact";
		public gnext_psorecordid: string = "gnext_psorecordid";
		public gnext_employingagencyemailaddress: string = "gnext_employingagencyemailaddress";
		public gnext_injoryordeathcausedbybeneficiaryname: string = "gnext_injoryordeathcausedbybeneficiaryname";
		public gnext_isinjurybasedonaseptember112001exposure: string = "gnext_isinjurybasedonaseptember112001exposure";
		public gnext_agencypointofcontactphonenumber: string = "gnext_agencypointofcontactphonenumber";
		public gnext_dutystatusname: string = "gnext_dutystatusname";
		public gnext_state: string = "gnext_state";
		public gnext_requireddocumentsuploadedorjustified: string = "gnext_requireddocumentsuploadedorjustified";
		public gnext_determinedstatelineofdutydeathbenefitsname: string = "gnext_determinedstatelineofdutydeathbenefitsname";
		public createdbyname: string = "createdbyname";
		public gnext_authorizedtorepresentname: string = "gnext_authorizedtorepresentname";
		public gnext_officerengagedinauthorizedactivities: string = "gnext_officerengagedinauthorizedactivities";
		public gnext_injurytypeelectricity: string = "gnext_injurytypeelectricity";
		public gnext_injurytypevehicleboatairplanehelicopter: string = "gnext_injurytypevehicleboatairplanehelicopter";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public gnext_nootherbenefitsfiledname: string = "gnext_nootherbenefitsfiledname";
		public gnext_filedfederalemployeescompensationact: string = "gnext_filedfederalemployeescompensationact";
		public gnext_agencypocinfosameasemployingagency: string = "gnext_agencypocinfosameasemployingagency";
		public gnext_filedworkerscompensationname: string = "gnext_filedworkerscompensationname";
		public gnext_officergrossnegligencename: string = "gnext_officergrossnegligencename";
		public gnext_agencypointofcontactemailaddress: string = "gnext_agencypointofcontactemailaddress";
		public gnext_officeremployedinnoncivilianmilitarycapname: string = "gnext_officeremployedinnoncivilianmilitarycapname";
		public gnext_agencyheadinfosameasemployingagencyname: string = "gnext_agencyheadinfosameasemployingagencyname";
		public gnext_agencyheadlastname: string = "gnext_agencyheadlastname";
		public gnext_injurytypestrokename: string = "gnext_injurytypestrokename";
		public gnext_readytosubmitapplication: string = "gnext_readytosubmitapplication";
		public gnext_injurytypeclimaticconditions: string = "gnext_injurytypeclimaticconditions";
		public gnext_addressline2: string = "gnext_addressline2";
		public gnext_officersmiddlename: string = "gnext_officersmiddlename";
		public gnext_describeotherdetermination: string = "gnext_describeotherdetermination";
		public gnext_officerengagedinpublicssafetyortrainingname: string = "gnext_officerengagedinpublicssafetyortrainingname";
		public gnext_datereceived: string = "gnext_datereceived";
		public gnext_agencyheadjobtitle: string = "gnext_agencyheadjobtitle";
		public gnext_specifyifotherinjurytype: string = "gnext_specifyifotherinjurytype";
		public stageid: string = "stageid";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public gnext_injurytypesharpinstrumentsbluntobjectsname: string = "gnext_injurytypesharpinstrumentsbluntobjectsname";
		public gnext_determinedstatelineofdutydeathbenefits: string = "gnext_determinedstatelineofdutydeathbenefits";
		public gnext_determinedmedicalretirement: string = "gnext_determinedmedicalretirement";
		public gnext_officergrossnegligence: string = "gnext_officergrossnegligence";
		public gnext_filedmedicalretirement: string = "gnext_filedmedicalretirement";
		public gnext_officerservingascontractorname: string = "gnext_officerservingascontractorname";
		public gnext_upload24houractivityreportname: string = "gnext_upload24houractivityreportname";
		public gnext_certificationofapplicationname: string = "gnext_certificationofapplicationname";
		public gnext_agencypocsuffix: string = "gnext_agencypocsuffix";
		public gnext_injurytypeoccupationaldiseasename: string = "gnext_injurytypeoccupationaldiseasename";
		public gnext_actionswithinprimaryjurisdictionname: string = "gnext_actionswithinprimaryjurisdictionname";
		public importsequencenumber: string = "importsequencenumber";
		public gnext_otherbenefitsfiledname: string = "gnext_otherbenefitsfiledname";
		public gnext_officersphonenumber: string = "gnext_officersphonenumber";
		public gnext_officeremployedinnoncivilianmilita_wfsname: string = "gnext_officeremployedinnoncivilianmilita_wfsname";
		public gnext_psareporttypename: string = "gnext_psareporttypename";
		public gnext_applicanttype: string = "gnext_applicanttype";
		public gnext_officergrossnegligence_wfs: string = "gnext_officergrossnegligence_wfs";
		public gnext_injurytypeinfectiousdiseasename: string = "gnext_injurytypeinfectiousdiseasename";
		public gnext_officersdateofmedicalretirement: string = "gnext_officersdateofmedicalretirement";
		public gnext_determineworkerscompensation: string = "gnext_determineworkerscompensation";
		public gnext_readytosubmitapplicationname: string = "gnext_readytosubmitapplicationname";
		public gnext_atthetimeofinurythatresultedindeathname: string = "gnext_atthetimeofinurythatresultedindeathname";
		public gnext_indicationofvoluntaryintoxicationexplanat: string = "gnext_indicationofvoluntaryintoxicationexplanat";
		public gnext_injoryordeathcausedbybeneficiary: string = "gnext_injoryordeathcausedbybeneficiary";
		public gnext_psorecordidname: string = "gnext_psorecordidname";
		public gnext_applicanttypename: string = "gnext_applicanttypename";
		public gnext_psadeathreporteridyominame: string = "gnext_psadeathreporteridyominame";
		public gnext_injurytypesharpinstrumentsbluntobjects: string = "gnext_injurytypesharpinstrumentsbluntobjects";
		public gnext_datesubmittedcalculated: string = "gnext_datesubmittedcalculated";
		public gnext_injurytyperadiation: string = "gnext_injurytyperadiation";
		public gnext_agencyheadstatename: string = "gnext_agencyheadstatename";
		public modifiedbyname: string = "modifiedbyname";
		public gnext_statename: string = "gnext_statename";
		public gnext_injurytypestroke: string = "gnext_injurytypestroke";
		public gnext_determinedsept11victimcompfund: string = "gnext_determinedsept11victimcompfund";
		public gnext_officeremployedinnoncivilianmilita_wfs: string = "gnext_officeremployedinnoncivilianmilita_wfs";
		public gnext_injurytypechemicalsname: string = "gnext_injurytypechemicalsname";
		public gnext_otherbenefitsdetermined: string = "gnext_otherbenefitsdetermined";
		public gnext_officerengagedinactivityauthorizedtoenga: string = "gnext_officerengagedinactivityauthorizedtoenga";
		public gnext_fileddcretirementanddisabilityact: string = "gnext_fileddcretirementanddisabilityact";
		public gnext_injurytypestressorstrain: string = "gnext_injurytypestressorstrain";
		public gnext_officeremployedinnonciviliancapexplanatio: string = "gnext_officeremployedinnonciviliancapexplanatio";
		public modifiedby: string = "modifiedby";
		public gnext_filedworkerscompensation: string = "gnext_filedworkerscompensation";
		public gnext_agencyheadcity: string = "gnext_agencyheadcity";
		public gnext_agencyheadphonenumber: string = "gnext_agencyheadphonenumber";
		public gnext_agencypocstatename: string = "gnext_agencypocstatename";
		public gnext_indicationofvoluntaryintoxication: string = "gnext_indicationofvoluntaryintoxication";
		public gnext_injurytypeviralinfection: string = "gnext_injurytypeviralinfection";
		public gnext_extraordinaryrequestbyemployingagencyname: string = "gnext_extraordinaryrequestbyemployingagencyname";
		
	}
    /** @description Web API attribute string helper class for gnext_pso_deathreport
     */ 
    export class gnext_pso_deathreportWebAPI {
        public gnext_agencyheadaddressline2: string = "gnext_agencyheadaddressline2";
		public gnext_injurytypephysicalblows: string = "gnext_injurytypephysicalblows";
		public gnext_nootherbenefitsdeterminedname: string = "gnext_nootherbenefitsdeterminedname";
		public gnext_authorizedcommuting: string = "gnext_authorizedcommuting";
		public gnext_injurytypefiresmokeinhalation: string = "gnext_injurytypefiresmokeinhalation";
		public gnext_agencyheadaddressline1: string = "gnext_agencyheadaddressline1";
		public gnext_agencyhead_deathreportidname: string = "gnext_agencyhead_deathreportidname";
		public gnext_officersemailaddress: string = "gnext_officersemailaddress";
		public gnext_officerintenttobringaboutownharm: string = "gnext_officerintenttobringaboutownharm";
		public gnext_injurycausedbyintentionalmisconductdescri: string = "gnext_injurycausedbyintentionalmisconductdescri";
		public gnext_filedsept11victimcompfund: string = "gnext_filedsept11victimcompfund";
		public owninguser: string = "owninguser";
		public gnext_toxicologyanalysisperformedname: string = "gnext_toxicologyanalysisperformedname";
		public overriddencreatedon: string = "overriddencreatedon";
		public gnext_agencyheadprefix: string = "gnext_agencyheadprefix";
		public statuscodename: string = "statuscodename";
		public gnext_officerservingiasvolunteername: string = "gnext_officerservingiasvolunteername";
		public gnext_determineworkerscompensationname: string = "gnext_determineworkerscompensationname";
		public gnext_addressline1: string = "gnext_addressline1";
		public gnext_officerengagedinauthorizedactivitiesname: string = "gnext_officerengagedinauthorizedactivitiesname";
		public gnext_agencyjurisdictionname: string = "gnext_agencyjurisdictionname";
		public gnext_authorizedcommutingname: string = "gnext_authorizedcommutingname";
		public gnext_officeremployedinnoncivilianmilitarycap: string = "gnext_officeremployedinnoncivilianmilitarycap";
		public gnext_officersssn: string = "gnext_officersssn";
		public gnext_injurytypeothername: string = "gnext_injurytypeothername";
		public gnext_atthetimeofinurythatresultedindeath: string = "gnext_atthetimeofinurythatresultedindeath";
		public gnext_injurytypeoccupationaldisease: string = "gnext_injurytypeoccupationaldisease";
		public gnext_filedsocialsecurity: string = "gnext_filedsocialsecurity";
		public gnext_officerslastname: string = "gnext_officerslastname";
		public gnext_injurytypevasularrupturename: string = "gnext_injurytypevasularrupturename";
		public gnext_state_other: string = "gnext_state_other";
		public gnext_partbsubmissionstatusname: string = "gnext_partbsubmissionstatusname";
		public gnext_injurytypebullets: string = "gnext_injurytypebullets";
		public gnext_filedworkmanscompensation: string = "gnext_filedworkmanscompensation";
		public gnext_indicationofharmcontributedbyexplanation: string = "gnext_indicationofharmcontributedbyexplanation";
		public gnext_agencyjurisdicationifother: string = "gnext_agencyjurisdicationifother";
		public gnext_employingagencyphonenumber: string = "gnext_employingagencyphonenumber";
		public gnext_otherbenefitsdeterminedname: string = "gnext_otherbenefitsdeterminedname";
		public createdby: string = "createdby";
		public gnext_agencyheadinfosameasemployingagency: string = "gnext_agencyheadinfosameasemployingagency";
		public gnext_typeofinjuryname: string = "gnext_typeofinjuryname";
		public gnext_toxicologyanalysisperformed_wfs: string = "gnext_toxicologyanalysisperformed_wfs";
		public gnext_nootherbenefitsdetermined: string = "gnext_nootherbenefitsdetermined";
		public gnext_psareportidname: string = "gnext_psareportidname";
		public gnext_indicationofvoluntaryintoxication_wfsname: string = "gnext_indicationofvoluntaryintoxication_wfsname";
		public gnext_psareporttype: string = "gnext_psareporttype";
		public gnext_iscontactinformationforagencyheadthesame: string = "gnext_iscontactinformationforagencyheadthesame";
		public createdbyyominame: string = "createdbyyominame";
		public gnext_datesignedcalculated: string = "gnext_datesignedcalculated";
		public gnext_extraordinaryrequestbyemployingagency: string = "gnext_extraordinaryrequestbyemployingagency";
		public gnext_personalvehicleagencyrequirestoworkname: string = "gnext_personalvehicleagencyrequirestoworkname";
		public gnext_psareportidyominame: string = "gnext_psareportidyominame";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_authorizedtorepresent: string = "gnext_authorizedtorepresent";
		public gnext_indicationofvoluntaryintoxicationname: string = "gnext_indicationofvoluntaryintoxicationname";
		public gnext_filedfederalemployeescompensationactname: string = "gnext_filedfederalemployeescompensationactname";
		public gnext_describeapplicanttypeother: string = "gnext_describeapplicanttypeother";
		public gnext_officerdateofmedicalretirement: string = "gnext_officerdateofmedicalretirement";
		public gnext_travelingbetweenhomeinworkvehicle: string = "gnext_travelingbetweenhomeinworkvehicle";
		public _gnext_agencyhead_deathreportid_value: string = "_gnext_agencyhead_deathreportid_value";
		public gnext_datesigned: string = "gnext_datesigned";
		public gnext_injurytypeviralinfectionname: string = "gnext_injurytypeviralinfectionname";
		public gnext_numberofotherbeneficiaries: string = "gnext_numberofotherbeneficiaries";
		public gnext_officergrossnegligence_wfsname: string = "gnext_officergrossnegligence_wfsname";
		public gnext_injurycasuedbyintentionalmisconduct_wfsname: string = "gnext_injurycasuedbyintentionalmisconduct_wfsname";
		public gnext_agencyheadzipcode: string = "gnext_agencyheadzipcode";
		public gnext_determinedworkerscompensationname: string = "gnext_determinedworkerscompensationname";
		public statuscode: string = "statuscode";
		public gnext_agencyclassificationname: string = "gnext_agencyclassificationname";
		public statecode: string = "statecode";
		public gnext_filedsept11victimcompfundname: string = "gnext_filedsept11victimcompfundname";
		public gnext_agencypointofcontactaddressline1: string = "gnext_agencypointofcontactaddressline1";
		public gnext_injurytypefiresmokeinhalationname: string = "gnext_injurytypefiresmokeinhalationname";
		public gnext_uploadstatementofcircumstance: string = "gnext_uploadstatementofcircumstance";
		public gnext_injurytypeinfectiousdisease: string = "gnext_injurytypeinfectiousdisease";
		public gnext_currentdatetime: string = "gnext_currentdatetime";
		public gnext_publicsafetyofficerstitle: string = "gnext_publicsafetyofficerstitle";
		public gnext_iscontactinformationforagencyheadthesamename: string = "gnext_iscontactinformationforagencyheadthesamename";
		public gnext_determinedsocialsecurityname: string = "gnext_determinedsocialsecurityname";
		public gnext_agencypocstate: string = "gnext_agencypocstate";
		public gnext_pso_deathreportid: string = "gnext_pso_deathreportid";
		public statecodename: string = "statecodename";
		public gnext_agencyheadprefixother: string = "gnext_agencyheadprefixother";
		public gnext_toxicologyanalysisperformed: string = "gnext_toxicologyanalysisperformed";
		public gnext_deathreportstage: string = "gnext_deathreportstage";
		public gnext_agencypointofcontactlastname: string = "gnext_agencypointofcontactlastname";
		public gnext_unvalidateddocsname: string = "gnext_unvalidateddocsname";
		public gnext_personalvehicleagencyrequirestowork: string = "gnext_personalvehicleagencyrequirestowork";
		public gnext_nameofemployingagencyorganizationorunit: string = "gnext_nameofemployingagencyorganizationorunit";
		public modifiedon: string = "modifiedon";
		public _gnext_psareportid_value: string = "_gnext_psareportid_value";
		public gnext_agencyheadcountry: string = "gnext_agencyheadcountry";
		public gnext_unvalidateddocs: string = "gnext_unvalidateddocs";
		public gnext_travelingbetweenhomeinworkvehiclename: string = "gnext_travelingbetweenhomeinworkvehiclename";
		public gnext_determinedfederalemployeescompactname: string = "gnext_determinedfederalemployeescompactname";
		public gnext_filedmedicalretirementname: string = "gnext_filedmedicalretirementname";
		public gnext_agencyheadstate: string = "gnext_agencyheadstate";
		public gnext_createpsorecordname: string = "gnext_createpsorecordname";
		public createdon: string = "createdon";
		public gnext_officerprefixother: string = "gnext_officerprefixother";
		public gnext_filedstatelineofdutydeathbenefits: string = "gnext_filedstatelineofdutydeathbenefits";
		public gnext_filedsocialsecurityname: string = "gnext_filedsocialsecurityname";
		public gnext_officersalternatephonenumber: string = "gnext_officersalternatephonenumber";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public versionnumber: string = "versionnumber";
		public gnext_agencyppointofcontactcity: string = "gnext_agencyppointofcontactcity";
		public gnext_agencyclassificationifother: string = "gnext_agencyclassificationifother";
		public gnext_name: string = "gnext_name";
		public gnext_agencypointofcontactfirstname: string = "gnext_agencypointofcontactfirstname";
		public createdonbehalfby: string = "createdonbehalfby";
		public gnext_filedworkmanscompensationname: string = "gnext_filedworkmanscompensationname";
		public gnext_injurycasuedbyintentionalmisconductname: string = "gnext_injurycasuedbyintentionalmisconductname";
		public gnext_injurytyperadiationname: string = "gnext_injurytyperadiationname";
		public gnext_officerengagedinactivityauthorizedtoengag: string = "gnext_officerengagedinactivityauthorizedtoengag";
		public gnext_agencyheademailaddress: string = "gnext_agencyheademailaddress";
		public gnext_injurycasuedbyintentionalmisconduct: string = "gnext_injurycasuedbyintentionalmisconduct";
		public gnext_employingagencyalternatephonenumber: string = "gnext_employingagencyalternatephonenumber";
		public gnext_agencypointofcontactcountry: string = "gnext_agencypointofcontactcountry";
		public gnext_agencypointofcontactalternatephonenumber: string = "gnext_agencypointofcontactalternatephonenumber";
		public gnext_accountidyominame: string = "gnext_accountidyominame";
		public _processid_value: string = "_processid_value";
		public gnext_agencyheadsuffix: string = "gnext_agencyheadsuffix";
		public owneridyominame: string = "owneridyominame";
		public gnext_deathreportstagename: string = "gnext_deathreportstagename";
		public gnext_agencyjurisdiction: string = "gnext_agencyjurisdiction";
		public gnext_injurytypeclimaticconditionsname: string = "gnext_injurytypeclimaticconditionsname";
		public gnext_agencypointofcontactstate: string = "gnext_agencypointofcontactstate";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_injurytypebulletsname: string = "gnext_injurytypebulletsname";
		public _gnext_psadeathreporterid_value: string = "_gnext_psadeathreporterid_value";
		public _gnext_accountid_value: string = "_gnext_accountid_value";
		public gnext_agencypocstate_other: string = "gnext_agencypocstate_other";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public gnext_agencypocinfosameasemployingagencyname: string = "gnext_agencypocinfosameasemployingagencyname";
		public gnext_determinedsept11victimcompfundname: string = "gnext_determinedsept11victimcompfundname";
		public gnext_ifotherengagementtype: string = "gnext_ifotherengagementtype";
		public gnext_officerservingiasvolunteer: string = "gnext_officerservingiasvolunteer";
		public gnext_officerprefix: string = "gnext_officerprefix";
		public gnext_agencypointofcontactzip: string = "gnext_agencypointofcontactzip";
		public gnext_injurycasuedbyintentionalmisconduct_wfs: string = "gnext_injurycasuedbyintentionalmisconduct_wfs";
		public gnext_officersdateofinjuryordeath: string = "gnext_officersdateofinjuryordeath";
		public gnext_injurytypechemicals: string = "gnext_injurytypechemicals";
		public gnext_officerservingascontractor: string = "gnext_officerservingascontractor";
		public gnext_injurytypeheartattackname: string = "gnext_injurytypeheartattackname";
		public traversedpath: string = "traversedpath";
		public gnext_determinedmedicalretirementname: string = "gnext_determinedmedicalretirementname";
		public gnext_officerintenttobringaboutownharm_wfs: string = "gnext_officerintenttobringaboutownharm_wfs";
		public gnext_officerengagedinactivityauthorizedtoenganame: string = "gnext_officerengagedinactivityauthorizedtoenganame";
		public gnext_injurytypephysicalblowsname: string = "gnext_injurytypephysicalblowsname";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public gnext_agencypocprefix: string = "gnext_agencypocprefix";
		public gnext_filedstatelineofdutydeathbenefitsname: string = "gnext_filedstatelineofdutydeathbenefitsname";
		public gnext_agencypocprefixname: string = "gnext_agencypocprefixname";
		public gnext_agencyclassification: string = "gnext_agencyclassification";
		public gnext_injurytypeother: string = "gnext_injurytypeother";
		public owneridtype: string = "owneridtype";
		public gnext_officersfirstname: string = "gnext_officersfirstname";
		public gnext_agencypointofcontactjobtitle: string = "gnext_agencypointofcontactjobtitle";
		public gnext_determineddcretirementanddisabilityact: string = "gnext_determineddcretirementanddisabilityact";
		public gnext_grossnegligenceexplanation: string = "gnext_grossnegligenceexplanation";
		public gnext_agencyheadalternatephonenumber: string = "gnext_agencyheadalternatephonenumber";
		public gnext_officerintenttobringaboutownharm_wfsname: string = "gnext_officerintenttobringaboutownharm_wfsname";
		public gnext_officerprefixname: string = "gnext_officerprefixname";
		public gnext_describeotherfiled: string = "gnext_describeotherfiled";
		public owneridname: string = "owneridname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public gnext_agencypointofcontactaddressline2: string = "gnext_agencypointofcontactaddressline2";
		public gnext_injurytypeheartattack: string = "gnext_injurytypeheartattack";
		public gnext_agencypocprefixother: string = "gnext_agencypocprefixother";
		public gnext_agencyheadstate_other: string = "gnext_agencyheadstate_other";
		public gnext_agencyheadfirstname: string = "gnext_agencyheadfirstname";
		public gnext_officersdateofbirth: string = "gnext_officersdateofbirth";
		public gnext_whatwasthedateofinjury: string = "gnext_whatwasthedateofinjury";
		public gnext_injurytypevasularrupture: string = "gnext_injurytypevasularrupture";
		public gnext_officersuffix: string = "gnext_officersuffix";
		public gnext_isinjurybasedonaseptember112001exposurename: string = "gnext_isinjurybasedonaseptember112001exposurename";
		public owningteam: string = "owningteam";
		public gnext_accountidname: string = "gnext_accountidname";
		public gnext_officerengagedinpublicssafetyortraining: string = "gnext_officerengagedinpublicssafetyortraining";
		public gnext_statementofcircumstance: string = "gnext_statementofcircumstance";
		public gnext_country: string = "gnext_country";
		public gnext_upload24houractivityreport: string = "gnext_upload24houractivityreport";
		public gnext_injurytypeexplosivesname: string = "gnext_injurytypeexplosivesname";
		public gnext_injurytypevehicleboatairplanehelicoptername: string = "gnext_injurytypevehicleboatairplanehelicoptername";
		public gnext_dutystatusother: string = "gnext_dutystatusother";
		public gnext_certificationofapplication: string = "gnext_certificationofapplication";
		public gnext_numberofotherbeneficiariesname: string = "gnext_numberofotherbeneficiariesname";
		public gnext_injurytypeelectricityname: string = "gnext_injurytypeelectricityname";
		public gnext_indicationofvoluntaryintoxication_wfs: string = "gnext_indicationofvoluntaryintoxication_wfs";
		public gnext_typeofinjury: string = "gnext_typeofinjury";
		public gnext_agencyheadprefixname: string = "gnext_agencyheadprefixname";
		public gnext_nootherbenefitsfiled: string = "gnext_nootherbenefitsfiled";
		public gnext_psadeathreporteridname: string = "gnext_psadeathreporteridname";
		public gnext_determinedsocialsecurity: string = "gnext_determinedsocialsecurity";
		public gnext_officerintenttoselfharmexplanation: string = "gnext_officerintenttoselfharmexplanation";
		public gnext_createpsorecord: string = "gnext_createpsorecord";
		public gnext_toxicologyanalysisperformed_wfsname: string = "gnext_toxicologyanalysisperformed_wfsname";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public gnext_determinedworkerscompensation: string = "gnext_determinedworkerscompensation";
		public gnext_determineddcretirementanddisabilityactname: string = "gnext_determineddcretirementanddisabilityactname";
		public gnext_uploadstatementofcircumstancename: string = "gnext_uploadstatementofcircumstancename";
		public gnext_partbsubmissionstatus: string = "gnext_partbsubmissionstatus";
		public gnext_zipcode: string = "gnext_zipcode";
		public _ownerid_value: string = "_ownerid_value";
		public gnext_fileddcretirementanddisabilityactname: string = "gnext_fileddcretirementanddisabilityactname";
		public gnext_injurytypestressorstrainname: string = "gnext_injurytypestressorstrainname";
		public gnext_actionswithinprimaryjurisdiction: string = "gnext_actionswithinprimaryjurisdiction";
		public gnext_officerintenttobringaboutownharmname: string = "gnext_officerintenttobringaboutownharmname";
		public gnext_city: string = "gnext_city";
		public gnext_otherbenefitsfiled: string = "gnext_otherbenefitsfiled";
		public gnext_dutystatus: string = "gnext_dutystatus";
		public gnext_injurytypeexplosives: string = "gnext_injurytypeexplosives";
		public gnext_causeofinjuryother: string = "gnext_causeofinjuryother";
		public gnext_determinedfederalemployeescompact: string = "gnext_determinedfederalemployeescompact";
		public _gnext_psorecordid_value: string = "_gnext_psorecordid_value";
		public gnext_employingagencyemailaddress: string = "gnext_employingagencyemailaddress";
		public gnext_injoryordeathcausedbybeneficiaryname: string = "gnext_injoryordeathcausedbybeneficiaryname";
		public gnext_isinjurybasedonaseptember112001exposure: string = "gnext_isinjurybasedonaseptember112001exposure";
		public gnext_agencypointofcontactphonenumber: string = "gnext_agencypointofcontactphonenumber";
		public gnext_dutystatusname: string = "gnext_dutystatusname";
		public gnext_state: string = "gnext_state";
		public gnext_requireddocumentsuploadedorjustified: string = "gnext_requireddocumentsuploadedorjustified";
		public gnext_determinedstatelineofdutydeathbenefitsname: string = "gnext_determinedstatelineofdutydeathbenefitsname";
		public createdbyname: string = "createdbyname";
		public gnext_authorizedtorepresentname: string = "gnext_authorizedtorepresentname";
		public gnext_officerengagedinauthorizedactivities: string = "gnext_officerengagedinauthorizedactivities";
		public gnext_injurytypeelectricity: string = "gnext_injurytypeelectricity";
		public gnext_injurytypevehicleboatairplanehelicopter: string = "gnext_injurytypevehicleboatairplanehelicopter";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public gnext_nootherbenefitsfiledname: string = "gnext_nootherbenefitsfiledname";
		public gnext_filedfederalemployeescompensationact: string = "gnext_filedfederalemployeescompensationact";
		public gnext_agencypocinfosameasemployingagency: string = "gnext_agencypocinfosameasemployingagency";
		public gnext_filedworkerscompensationname: string = "gnext_filedworkerscompensationname";
		public gnext_officergrossnegligencename: string = "gnext_officergrossnegligencename";
		public gnext_agencypointofcontactemailaddress: string = "gnext_agencypointofcontactemailaddress";
		public gnext_officeremployedinnoncivilianmilitarycapname: string = "gnext_officeremployedinnoncivilianmilitarycapname";
		public gnext_agencyheadinfosameasemployingagencyname: string = "gnext_agencyheadinfosameasemployingagencyname";
		public gnext_agencyheadlastname: string = "gnext_agencyheadlastname";
		public gnext_injurytypestrokename: string = "gnext_injurytypestrokename";
		public gnext_readytosubmitapplication: string = "gnext_readytosubmitapplication";
		public gnext_injurytypeclimaticconditions: string = "gnext_injurytypeclimaticconditions";
		public gnext_addressline2: string = "gnext_addressline2";
		public gnext_officersmiddlename: string = "gnext_officersmiddlename";
		public gnext_describeotherdetermination: string = "gnext_describeotherdetermination";
		public gnext_officerengagedinpublicssafetyortrainingname: string = "gnext_officerengagedinpublicssafetyortrainingname";
		public gnext_datereceived: string = "gnext_datereceived";
		public gnext_agencyheadjobtitle: string = "gnext_agencyheadjobtitle";
		public gnext_specifyifotherinjurytype: string = "gnext_specifyifotherinjurytype";
		public _stageid_value: string = "_stageid_value";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public gnext_injurytypesharpinstrumentsbluntobjectsname: string = "gnext_injurytypesharpinstrumentsbluntobjectsname";
		public gnext_determinedstatelineofdutydeathbenefits: string = "gnext_determinedstatelineofdutydeathbenefits";
		public gnext_determinedmedicalretirement: string = "gnext_determinedmedicalretirement";
		public gnext_officergrossnegligence: string = "gnext_officergrossnegligence";
		public gnext_filedmedicalretirement: string = "gnext_filedmedicalretirement";
		public gnext_officerservingascontractorname: string = "gnext_officerservingascontractorname";
		public gnext_upload24houractivityreportname: string = "gnext_upload24houractivityreportname";
		public gnext_certificationofapplicationname: string = "gnext_certificationofapplicationname";
		public gnext_agencypocsuffix: string = "gnext_agencypocsuffix";
		public gnext_injurytypeoccupationaldiseasename: string = "gnext_injurytypeoccupationaldiseasename";
		public gnext_actionswithinprimaryjurisdictionname: string = "gnext_actionswithinprimaryjurisdictionname";
		public importsequencenumber: string = "importsequencenumber";
		public gnext_otherbenefitsfiledname: string = "gnext_otherbenefitsfiledname";
		public gnext_officersphonenumber: string = "gnext_officersphonenumber";
		public gnext_officeremployedinnoncivilianmilita_wfsname: string = "gnext_officeremployedinnoncivilianmilita_wfsname";
		public gnext_psareporttypename: string = "gnext_psareporttypename";
		public gnext_applicanttype: string = "gnext_applicanttype";
		public gnext_officergrossnegligence_wfs: string = "gnext_officergrossnegligence_wfs";
		public gnext_injurytypeinfectiousdiseasename: string = "gnext_injurytypeinfectiousdiseasename";
		public gnext_officersdateofmedicalretirement: string = "gnext_officersdateofmedicalretirement";
		public gnext_determineworkerscompensation: string = "gnext_determineworkerscompensation";
		public gnext_readytosubmitapplicationname: string = "gnext_readytosubmitapplicationname";
		public gnext_atthetimeofinurythatresultedindeathname: string = "gnext_atthetimeofinurythatresultedindeathname";
		public gnext_indicationofvoluntaryintoxicationexplanat: string = "gnext_indicationofvoluntaryintoxicationexplanat";
		public gnext_injoryordeathcausedbybeneficiary: string = "gnext_injoryordeathcausedbybeneficiary";
		public gnext_psorecordidname: string = "gnext_psorecordidname";
		public gnext_applicanttypename: string = "gnext_applicanttypename";
		public gnext_psadeathreporteridyominame: string = "gnext_psadeathreporteridyominame";
		public gnext_injurytypesharpinstrumentsbluntobjects: string = "gnext_injurytypesharpinstrumentsbluntobjects";
		public gnext_datesubmittedcalculated: string = "gnext_datesubmittedcalculated";
		public gnext_injurytyperadiation: string = "gnext_injurytyperadiation";
		public gnext_agencyheadstatename: string = "gnext_agencyheadstatename";
		public modifiedbyname: string = "modifiedbyname";
		public gnext_statename: string = "gnext_statename";
		public gnext_injurytypestroke: string = "gnext_injurytypestroke";
		public gnext_determinedsept11victimcompfund: string = "gnext_determinedsept11victimcompfund";
		public gnext_officeremployedinnoncivilianmilita_wfs: string = "gnext_officeremployedinnoncivilianmilita_wfs";
		public gnext_injurytypechemicalsname: string = "gnext_injurytypechemicalsname";
		public gnext_otherbenefitsdetermined: string = "gnext_otherbenefitsdetermined";
		public gnext_officerengagedinactivityauthorizedtoenga: string = "gnext_officerengagedinactivityauthorizedtoenga";
		public gnext_fileddcretirementanddisabilityact: string = "gnext_fileddcretirementanddisabilityact";
		public gnext_injurytypestressorstrain: string = "gnext_injurytypestressorstrain";
		public gnext_officeremployedinnonciviliancapexplanatio: string = "gnext_officeremployedinnonciviliancapexplanatio";
		public modifiedby: string = "modifiedby";
		public gnext_filedworkerscompensation: string = "gnext_filedworkerscompensation";
		public gnext_agencyheadcity: string = "gnext_agencyheadcity";
		public gnext_agencyheadphonenumber: string = "gnext_agencyheadphonenumber";
		public gnext_agencypocstatename: string = "gnext_agencypocstatename";
		public gnext_indicationofvoluntaryintoxication: string = "gnext_indicationofvoluntaryintoxication";
		public gnext_injurytypeviralinfection: string = "gnext_injurytypeviralinfection";
		public gnext_extraordinaryrequestbyemployingagencyname: string = "gnext_extraordinaryrequestbyemployingagencyname";
			
    }
    /** @description Instantiates a gnext_pso_deathreport Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class gnext_pso_deathreport extends Entity {
		[key: string]: string | number
        public route: string = "gnext_pso_deathreports";
		public gnext_agencyheadaddressline2: string;
		public gnext_injurytypephysicalblows: string;
		public gnext_nootherbenefitsdeterminedname: number;
		public gnext_authorizedcommuting: string;
		public gnext_injurytypefiresmokeinhalation: string;
		public gnext_agencyheadaddressline1: string;
		public gnext_agencyhead_deathreportidname: string;
		public gnext_officersemailaddress: string;
		public gnext_officerintenttobringaboutownharm: string;
		public gnext_injurycausedbyintentionalmisconductdescri: string;
		public gnext_filedsept11victimcompfund: string;
		public owninguser: string;
		public gnext_toxicologyanalysisperformedname: number;
		public overriddencreatedon: string;
		public gnext_agencyheadprefix: string;
		public statuscodename: number;
		public gnext_officerservingiasvolunteername: number;
		public gnext_determineworkerscompensationname: number;
		public gnext_addressline1: string;
		public gnext_officerengagedinauthorizedactivitiesname: number;
		public gnext_agencyjurisdictionname: number;
		public gnext_authorizedcommutingname: number;
		public gnext_officeremployedinnoncivilianmilitarycap: string;
		public gnext_officersssn: string;
		public gnext_injurytypeothername: number;
		public gnext_atthetimeofinurythatresultedindeath: string;
		public gnext_injurytypeoccupationaldisease: string;
		public gnext_filedsocialsecurity: string;
		public gnext_officerslastname: string;
		public gnext_injurytypevasularrupturename: number;
		public gnext_state_other: string;
		public gnext_partbsubmissionstatusname: number;
		public gnext_injurytypebullets: string;
		public gnext_filedworkmanscompensation: string;
		public gnext_indicationofharmcontributedbyexplanation: string;
		public gnext_agencyjurisdicationifother: string;
		public gnext_employingagencyphonenumber: string;
		public gnext_otherbenefitsdeterminedname: number;
		public createdby: string;
		public gnext_agencyheadinfosameasemployingagency: string;
		public gnext_typeofinjuryname: number;
		public gnext_toxicologyanalysisperformed_wfs: string;
		public gnext_nootherbenefitsdetermined: string;
		public gnext_psareportidname: string;
		public gnext_indicationofvoluntaryintoxication_wfsname: number;
		public gnext_psareporttype: string;
		public gnext_iscontactinformationforagencyheadthesame: string;
		public createdbyyominame: string;
		public gnext_datesignedcalculated: string;
		public gnext_extraordinaryrequestbyemployingagency: string;
		public gnext_personalvehicleagencyrequirestoworkname: number;
		public gnext_psareportidyominame: string;
		public owningbusinessunit: string;
		public gnext_authorizedtorepresent: string;
		public gnext_indicationofvoluntaryintoxicationname: number;
		public gnext_filedfederalemployeescompensationactname: number;
		public gnext_describeapplicanttypeother: string;
		public gnext_officerdateofmedicalretirement: string;
		public gnext_travelingbetweenhomeinworkvehicle: string;
		public _gnext_agencyhead_deathreportid_value: string;
		public gnext_datesigned: string;
		public gnext_injurytypeviralinfectionname: number;
		public gnext_numberofotherbeneficiaries: string;
		public gnext_officergrossnegligence_wfsname: number;
		public gnext_injurycasuedbyintentionalmisconduct_wfsname: number;
		public gnext_agencyheadzipcode: string;
		public gnext_determinedworkerscompensationname: number;
		public statuscode: string;
		public gnext_agencyclassificationname: number;
		public statecode: number;
		public gnext_filedsept11victimcompfundname: number;
		public gnext_agencypointofcontactaddressline1: string;
		public gnext_injurytypefiresmokeinhalationname: number;
		public gnext_uploadstatementofcircumstance: string;
		public gnext_injurytypeinfectiousdisease: string;
		public gnext_currentdatetime: string;
		public gnext_publicsafetyofficerstitle: string;
		public gnext_iscontactinformationforagencyheadthesamename: number;
		public gnext_determinedsocialsecurityname: number;
		public gnext_agencypocstate: string;
		public gnext_pso_deathreportid: string;
		public statecodename: number;
		public gnext_agencyheadprefixother: string;
		public gnext_toxicologyanalysisperformed: string;
		public gnext_deathreportstage: string;
		public gnext_agencypointofcontactlastname: string;
		public gnext_unvalidateddocsname: number;
		public gnext_personalvehicleagencyrequirestowork: string;
		public gnext_nameofemployingagencyorganizationorunit: string;
		public modifiedon: string;
		public _gnext_psareportid_value: string;
		public gnext_agencyheadcountry: string;
		public gnext_unvalidateddocs: string;
		public gnext_travelingbetweenhomeinworkvehiclename: number;
		public gnext_determinedfederalemployeescompactname: number;
		public gnext_filedmedicalretirementname: number;
		public gnext_agencyheadstate: string;
		public gnext_createpsorecordname: number;
		public createdon: string;
		public gnext_officerprefixother: string;
		public gnext_filedstatelineofdutydeathbenefits: string;
		public gnext_filedsocialsecurityname: number;
		public gnext_officersalternatephonenumber: string;
		public modifiedonbehalfbyyominame: string;
		public versionnumber: number;
		public gnext_agencyppointofcontactcity: string;
		public gnext_agencyclassificationifother: string;
		public gnext_name: string;
		public gnext_agencypointofcontactfirstname: string;
		public createdonbehalfby: string;
		public gnext_filedworkmanscompensationname: number;
		public gnext_injurycasuedbyintentionalmisconductname: number;
		public gnext_injurytyperadiationname: number;
		public gnext_officerengagedinactivityauthorizedtoengag: string;
		public gnext_agencyheademailaddress: string;
		public gnext_injurycasuedbyintentionalmisconduct: string;
		public gnext_employingagencyalternatephonenumber: string;
		public gnext_agencypointofcontactcountry: string;
		public gnext_agencypointofcontactalternatephonenumber: string;
		public gnext_accountidyominame: string;
		public _processid_value: string;
		public gnext_agencyheadsuffix: string;
		public owneridyominame: string;
		public gnext_deathreportstagename: number;
		public gnext_agencyjurisdiction: string;
		public gnext_injurytypeclimaticconditionsname: number;
		public gnext_agencypointofcontactstate: string;
		public timezoneruleversionnumber: number;
		public gnext_injurytypebulletsname: number;
		public _gnext_psadeathreporterid_value: string;
		public _gnext_accountid_value: string;
		public gnext_agencypocstate_other: string;
		public modifiedonbehalfby: string;
		public gnext_agencypocinfosameasemployingagencyname: number;
		public gnext_determinedsept11victimcompfundname: number;
		public gnext_ifotherengagementtype: string;
		public gnext_officerservingiasvolunteer: string;
		public gnext_officerprefix: string;
		public gnext_agencypointofcontactzip: string;
		public gnext_injurycasuedbyintentionalmisconduct_wfs: string;
		public gnext_officersdateofinjuryordeath: string;
		public gnext_injurytypechemicals: string;
		public gnext_officerservingascontractor: string;
		public gnext_injurytypeheartattackname: number;
		public traversedpath: string;
		public gnext_determinedmedicalretirementname: number;
		public gnext_officerintenttobringaboutownharm_wfs: string;
		public gnext_officerengagedinactivityauthorizedtoenganame: number;
		public gnext_injurytypephysicalblowsname: number;
		public createdonbehalfbyname: string;
		public gnext_agencypocprefix: string;
		public gnext_filedstatelineofdutydeathbenefitsname: number;
		public gnext_agencypocprefixname: number;
		public gnext_agencyclassification: string;
		public gnext_injurytypeother: string;
		public owneridtype: string;
		public gnext_officersfirstname: string;
		public gnext_agencypointofcontactjobtitle: string;
		public gnext_determineddcretirementanddisabilityact: string;
		public gnext_grossnegligenceexplanation: string;
		public gnext_agencyheadalternatephonenumber: string;
		public gnext_officerintenttobringaboutownharm_wfsname: number;
		public gnext_officerprefixname: number;
		public gnext_describeotherfiled: string;
		public owneridname: string;
		public modifiedonbehalfbyname: string;
		public gnext_agencypointofcontactaddressline2: string;
		public gnext_injurytypeheartattack: string;
		public gnext_agencypocprefixother: string;
		public gnext_agencyheadstate_other: string;
		public gnext_agencyheadfirstname: string;
		public gnext_officersdateofbirth: string;
		public gnext_whatwasthedateofinjury: string;
		public gnext_injurytypevasularrupture: string;
		public gnext_officersuffix: string;
		public gnext_isinjurybasedonaseptember112001exposurename: number;
		public owningteam: string;
		public gnext_accountidname: string;
		public gnext_officerengagedinpublicssafetyortraining: string;
		public gnext_statementofcircumstance: string;
		public gnext_country: string;
		public gnext_upload24houractivityreport: string;
		public gnext_injurytypeexplosivesname: number;
		public gnext_injurytypevehicleboatairplanehelicoptername: number;
		public gnext_dutystatusother: string;
		public gnext_certificationofapplication: string;
		public gnext_numberofotherbeneficiariesname: number;
		public gnext_injurytypeelectricityname: number;
		public gnext_indicationofvoluntaryintoxication_wfs: string;
		public gnext_typeofinjury: string;
		public gnext_agencyheadprefixname: number;
		public gnext_nootherbenefitsfiled: string;
		public gnext_psadeathreporteridname: string;
		public gnext_determinedsocialsecurity: string;
		public gnext_officerintenttoselfharmexplanation: string;
		public gnext_createpsorecord: string;
		public gnext_toxicologyanalysisperformed_wfsname: number;
		public createdonbehalfbyyominame: string;
		public gnext_determinedworkerscompensation: string;
		public gnext_determineddcretirementanddisabilityactname: number;
		public gnext_uploadstatementofcircumstancename: number;
		public gnext_partbsubmissionstatus: string;
		public gnext_zipcode: string;
		public _ownerid_value: string;
		public gnext_fileddcretirementanddisabilityactname: number;
		public gnext_injurytypestressorstrainname: number;
		public gnext_actionswithinprimaryjurisdiction: string;
		public gnext_officerintenttobringaboutownharmname: number;
		public gnext_city: string;
		public gnext_otherbenefitsfiled: string;
		public gnext_dutystatus: string;
		public gnext_injurytypeexplosives: string;
		public gnext_causeofinjuryother: string;
		public gnext_determinedfederalemployeescompact: string;
		public _gnext_psorecordid_value: string;
		public gnext_employingagencyemailaddress: string;
		public gnext_injoryordeathcausedbybeneficiaryname: number;
		public gnext_isinjurybasedonaseptember112001exposure: string;
		public gnext_agencypointofcontactphonenumber: string;
		public gnext_dutystatusname: number;
		public gnext_state: string;
		public gnext_requireddocumentsuploadedorjustified: string;
		public gnext_determinedstatelineofdutydeathbenefitsname: number;
		public createdbyname: string;
		public gnext_authorizedtorepresentname: number;
		public gnext_officerengagedinauthorizedactivities: string;
		public gnext_injurytypeelectricity: string;
		public gnext_injurytypevehicleboatairplanehelicopter: string;
		public modifiedbyyominame: string;
		public gnext_nootherbenefitsfiledname: number;
		public gnext_filedfederalemployeescompensationact: string;
		public gnext_agencypocinfosameasemployingagency: string;
		public gnext_filedworkerscompensationname: number;
		public gnext_officergrossnegligencename: number;
		public gnext_agencypointofcontactemailaddress: string;
		public gnext_officeremployedinnoncivilianmilitarycapname: number;
		public gnext_agencyheadinfosameasemployingagencyname: number;
		public gnext_agencyheadlastname: string;
		public gnext_injurytypestrokename: number;
		public gnext_readytosubmitapplication: string;
		public gnext_injurytypeclimaticconditions: string;
		public gnext_addressline2: string;
		public gnext_officersmiddlename: string;
		public gnext_describeotherdetermination: string;
		public gnext_officerengagedinpublicssafetyortrainingname: number;
		public gnext_datereceived: string;
		public gnext_agencyheadjobtitle: string;
		public gnext_specifyifotherinjurytype: string;
		public _stageid_value: string;
		public utcconversiontimezonecode: number;
		public gnext_injurytypesharpinstrumentsbluntobjectsname: number;
		public gnext_determinedstatelineofdutydeathbenefits: string;
		public gnext_determinedmedicalretirement: string;
		public gnext_officergrossnegligence: string;
		public gnext_filedmedicalretirement: string;
		public gnext_officerservingascontractorname: number;
		public gnext_upload24houractivityreportname: number;
		public gnext_certificationofapplicationname: number;
		public gnext_agencypocsuffix: string;
		public gnext_injurytypeoccupationaldiseasename: number;
		public gnext_actionswithinprimaryjurisdictionname: number;
		public importsequencenumber: number;
		public gnext_otherbenefitsfiledname: number;
		public gnext_officersphonenumber: string;
		public gnext_officeremployedinnoncivilianmilita_wfsname: number;
		public gnext_psareporttypename: number;
		public gnext_applicanttype: string;
		public gnext_officergrossnegligence_wfs: string;
		public gnext_injurytypeinfectiousdiseasename: number;
		public gnext_officersdateofmedicalretirement: string;
		public gnext_determineworkerscompensation: string;
		public gnext_readytosubmitapplicationname: number;
		public gnext_atthetimeofinurythatresultedindeathname: number;
		public gnext_indicationofvoluntaryintoxicationexplanat: string;
		public gnext_injoryordeathcausedbybeneficiary: string;
		public gnext_psorecordidname: string;
		public gnext_applicanttypename: number;
		public gnext_psadeathreporteridyominame: string;
		public gnext_injurytypesharpinstrumentsbluntobjects: string;
		public gnext_datesubmittedcalculated: string;
		public gnext_injurytyperadiation: string;
		public gnext_agencyheadstatename: number;
		public modifiedbyname: string;
		public gnext_statename: number;
		public gnext_injurytypestroke: string;
		public gnext_determinedsept11victimcompfund: string;
		public gnext_officeremployedinnoncivilianmilita_wfs: string;
		public gnext_injurytypechemicalsname: number;
		public gnext_otherbenefitsdetermined: string;
		public gnext_officerengagedinactivityauthorizedtoenga: string;
		public gnext_fileddcretirementanddisabilityact: string;
		public gnext_injurytypestressorstrain: string;
		public gnext_officeremployedinnonciviliancapexplanatio: string;
		public modifiedby: string;
		public gnext_filedworkerscompensation: string;
		public gnext_agencyheadcity: string;
		public gnext_agencyheadphonenumber: string;
		public gnext_agencypocstatename: number;
		public gnext_indicationofvoluntaryintoxication: string;
		public gnext_injurytypeviralinfection: string;
		public gnext_extraordinaryrequestbyemployingagencyname: number;
			
        
        constructor(initData?: Ignext_pso_deathreport) {
			super("gnext_pso_deathreports");        
            if (initData == undefined) return;
			this.gnext_agencyheadaddressline2 = initData.gnext_agencyheadaddressline2;
			this.gnext_injurytypephysicalblows = initData.gnext_injurytypephysicalblows;
			this.gnext_nootherbenefitsdeterminedname = initData.gnext_nootherbenefitsdeterminedname;
			this.gnext_authorizedcommuting = initData.gnext_authorizedcommuting;
			this.gnext_injurytypefiresmokeinhalation = initData.gnext_injurytypefiresmokeinhalation;
			this.gnext_agencyheadaddressline1 = initData.gnext_agencyheadaddressline1;
			this.gnext_agencyhead_deathreportidname = initData.gnext_agencyhead_deathreportidname;
			this.gnext_officersemailaddress = initData.gnext_officersemailaddress;
			this.gnext_officerintenttobringaboutownharm = initData.gnext_officerintenttobringaboutownharm;
			this.gnext_injurycausedbyintentionalmisconductdescri = initData.gnext_injurycausedbyintentionalmisconductdescri;
			this.gnext_filedsept11victimcompfund = initData.gnext_filedsept11victimcompfund;
			this.owninguser = initData.owninguser;
			this.gnext_toxicologyanalysisperformedname = initData.gnext_toxicologyanalysisperformedname;
			this.overriddencreatedon = initData.overriddencreatedon;
			this.gnext_agencyheadprefix = initData.gnext_agencyheadprefix;
			this.statuscodename = initData.statuscodename;
			this.gnext_officerservingiasvolunteername = initData.gnext_officerservingiasvolunteername;
			this.gnext_determineworkerscompensationname = initData.gnext_determineworkerscompensationname;
			this.gnext_addressline1 = initData.gnext_addressline1;
			this.gnext_officerengagedinauthorizedactivitiesname = initData.gnext_officerengagedinauthorizedactivitiesname;
			this.gnext_agencyjurisdictionname = initData.gnext_agencyjurisdictionname;
			this.gnext_authorizedcommutingname = initData.gnext_authorizedcommutingname;
			this.gnext_officeremployedinnoncivilianmilitarycap = initData.gnext_officeremployedinnoncivilianmilitarycap;
			this.gnext_officersssn = initData.gnext_officersssn;
			this.gnext_injurytypeothername = initData.gnext_injurytypeothername;
			this.gnext_atthetimeofinurythatresultedindeath = initData.gnext_atthetimeofinurythatresultedindeath;
			this.gnext_injurytypeoccupationaldisease = initData.gnext_injurytypeoccupationaldisease;
			this.gnext_filedsocialsecurity = initData.gnext_filedsocialsecurity;
			this.gnext_officerslastname = initData.gnext_officerslastname;
			this.gnext_injurytypevasularrupturename = initData.gnext_injurytypevasularrupturename;
			this.gnext_state_other = initData.gnext_state_other;
			this.gnext_partbsubmissionstatusname = initData.gnext_partbsubmissionstatusname;
			this.gnext_injurytypebullets = initData.gnext_injurytypebullets;
			this.gnext_filedworkmanscompensation = initData.gnext_filedworkmanscompensation;
			this.gnext_indicationofharmcontributedbyexplanation = initData.gnext_indicationofharmcontributedbyexplanation;
			this.gnext_agencyjurisdicationifother = initData.gnext_agencyjurisdicationifother;
			this.gnext_employingagencyphonenumber = initData.gnext_employingagencyphonenumber;
			this.gnext_otherbenefitsdeterminedname = initData.gnext_otherbenefitsdeterminedname;
			this.createdby = initData.createdby;
			this.gnext_agencyheadinfosameasemployingagency = initData.gnext_agencyheadinfosameasemployingagency;
			this.gnext_typeofinjuryname = initData.gnext_typeofinjuryname;
			this.gnext_toxicologyanalysisperformed_wfs = initData.gnext_toxicologyanalysisperformed_wfs;
			this.gnext_nootherbenefitsdetermined = initData.gnext_nootherbenefitsdetermined;
			this.gnext_psareportidname = initData.gnext_psareportidname;
			this.gnext_indicationofvoluntaryintoxication_wfsname = initData.gnext_indicationofvoluntaryintoxication_wfsname;
			this.gnext_psareporttype = initData.gnext_psareporttype;
			this.gnext_iscontactinformationforagencyheadthesame = initData.gnext_iscontactinformationforagencyheadthesame;
			this.createdbyyominame = initData.createdbyyominame;
			this.gnext_datesignedcalculated = initData.gnext_datesignedcalculated;
			this.gnext_extraordinaryrequestbyemployingagency = initData.gnext_extraordinaryrequestbyemployingagency;
			this.gnext_personalvehicleagencyrequirestoworkname = initData.gnext_personalvehicleagencyrequirestoworkname;
			this.gnext_psareportidyominame = initData.gnext_psareportidyominame;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.gnext_authorizedtorepresent = initData.gnext_authorizedtorepresent;
			this.gnext_indicationofvoluntaryintoxicationname = initData.gnext_indicationofvoluntaryintoxicationname;
			this.gnext_filedfederalemployeescompensationactname = initData.gnext_filedfederalemployeescompensationactname;
			this.gnext_describeapplicanttypeother = initData.gnext_describeapplicanttypeother;
			this.gnext_officerdateofmedicalretirement = initData.gnext_officerdateofmedicalretirement;
			this.gnext_travelingbetweenhomeinworkvehicle = initData.gnext_travelingbetweenhomeinworkvehicle;
			this._gnext_agencyhead_deathreportid_value = initData._gnext_agencyhead_deathreportid_value;
			this.gnext_datesigned = initData.gnext_datesigned;
			this.gnext_injurytypeviralinfectionname = initData.gnext_injurytypeviralinfectionname;
			this.gnext_numberofotherbeneficiaries = initData.gnext_numberofotherbeneficiaries;
			this.gnext_officergrossnegligence_wfsname = initData.gnext_officergrossnegligence_wfsname;
			this.gnext_injurycasuedbyintentionalmisconduct_wfsname = initData.gnext_injurycasuedbyintentionalmisconduct_wfsname;
			this.gnext_agencyheadzipcode = initData.gnext_agencyheadzipcode;
			this.gnext_determinedworkerscompensationname = initData.gnext_determinedworkerscompensationname;
			this.statuscode = initData.statuscode;
			this.gnext_agencyclassificationname = initData.gnext_agencyclassificationname;
			this.statecode = initData.statecode;
			this.gnext_filedsept11victimcompfundname = initData.gnext_filedsept11victimcompfundname;
			this.gnext_agencypointofcontactaddressline1 = initData.gnext_agencypointofcontactaddressline1;
			this.gnext_injurytypefiresmokeinhalationname = initData.gnext_injurytypefiresmokeinhalationname;
			this.gnext_uploadstatementofcircumstance = initData.gnext_uploadstatementofcircumstance;
			this.gnext_injurytypeinfectiousdisease = initData.gnext_injurytypeinfectiousdisease;
			this.gnext_currentdatetime = initData.gnext_currentdatetime;
			this.gnext_publicsafetyofficerstitle = initData.gnext_publicsafetyofficerstitle;
			this.gnext_iscontactinformationforagencyheadthesamename = initData.gnext_iscontactinformationforagencyheadthesamename;
			this.gnext_determinedsocialsecurityname = initData.gnext_determinedsocialsecurityname;
			this.gnext_agencypocstate = initData.gnext_agencypocstate;
			this.gnext_pso_deathreportid = initData.gnext_pso_deathreportid;
			this.statecodename = initData.statecodename;
			this.gnext_agencyheadprefixother = initData.gnext_agencyheadprefixother;
			this.gnext_toxicologyanalysisperformed = initData.gnext_toxicologyanalysisperformed;
			this.gnext_deathreportstage = initData.gnext_deathreportstage;
			this.gnext_agencypointofcontactlastname = initData.gnext_agencypointofcontactlastname;
			this.gnext_unvalidateddocsname = initData.gnext_unvalidateddocsname;
			this.gnext_personalvehicleagencyrequirestowork = initData.gnext_personalvehicleagencyrequirestowork;
			this.gnext_nameofemployingagencyorganizationorunit = initData.gnext_nameofemployingagencyorganizationorunit;
			this.modifiedon = initData.modifiedon;
			this._gnext_psareportid_value = initData._gnext_psareportid_value;
			this.gnext_agencyheadcountry = initData.gnext_agencyheadcountry;
			this.gnext_unvalidateddocs = initData.gnext_unvalidateddocs;
			this.gnext_travelingbetweenhomeinworkvehiclename = initData.gnext_travelingbetweenhomeinworkvehiclename;
			this.gnext_determinedfederalemployeescompactname = initData.gnext_determinedfederalemployeescompactname;
			this.gnext_filedmedicalretirementname = initData.gnext_filedmedicalretirementname;
			this.gnext_agencyheadstate = initData.gnext_agencyheadstate;
			this.gnext_createpsorecordname = initData.gnext_createpsorecordname;
			this.createdon = initData.createdon;
			this.gnext_officerprefixother = initData.gnext_officerprefixother;
			this.gnext_filedstatelineofdutydeathbenefits = initData.gnext_filedstatelineofdutydeathbenefits;
			this.gnext_filedsocialsecurityname = initData.gnext_filedsocialsecurityname;
			this.gnext_officersalternatephonenumber = initData.gnext_officersalternatephonenumber;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.versionnumber = initData.versionnumber;
			this.gnext_agencyppointofcontactcity = initData.gnext_agencyppointofcontactcity;
			this.gnext_agencyclassificationifother = initData.gnext_agencyclassificationifother;
			this.gnext_name = initData.gnext_name;
			this.gnext_agencypointofcontactfirstname = initData.gnext_agencypointofcontactfirstname;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.gnext_filedworkmanscompensationname = initData.gnext_filedworkmanscompensationname;
			this.gnext_injurycasuedbyintentionalmisconductname = initData.gnext_injurycasuedbyintentionalmisconductname;
			this.gnext_injurytyperadiationname = initData.gnext_injurytyperadiationname;
			this.gnext_officerengagedinactivityauthorizedtoengag = initData.gnext_officerengagedinactivityauthorizedtoengag;
			this.gnext_agencyheademailaddress = initData.gnext_agencyheademailaddress;
			this.gnext_injurycasuedbyintentionalmisconduct = initData.gnext_injurycasuedbyintentionalmisconduct;
			this.gnext_employingagencyalternatephonenumber = initData.gnext_employingagencyalternatephonenumber;
			this.gnext_agencypointofcontactcountry = initData.gnext_agencypointofcontactcountry;
			this.gnext_agencypointofcontactalternatephonenumber = initData.gnext_agencypointofcontactalternatephonenumber;
			this.gnext_accountidyominame = initData.gnext_accountidyominame;
			this._processid_value = initData._processid_value;
			this.gnext_agencyheadsuffix = initData.gnext_agencyheadsuffix;
			this.owneridyominame = initData.owneridyominame;
			this.gnext_deathreportstagename = initData.gnext_deathreportstagename;
			this.gnext_agencyjurisdiction = initData.gnext_agencyjurisdiction;
			this.gnext_injurytypeclimaticconditionsname = initData.gnext_injurytypeclimaticconditionsname;
			this.gnext_agencypointofcontactstate = initData.gnext_agencypointofcontactstate;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.gnext_injurytypebulletsname = initData.gnext_injurytypebulletsname;
			this._gnext_psadeathreporterid_value = initData._gnext_psadeathreporterid_value;
			this._gnext_accountid_value = initData._gnext_accountid_value;
			this.gnext_agencypocstate_other = initData.gnext_agencypocstate_other;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.gnext_agencypocinfosameasemployingagencyname = initData.gnext_agencypocinfosameasemployingagencyname;
			this.gnext_determinedsept11victimcompfundname = initData.gnext_determinedsept11victimcompfundname;
			this.gnext_ifotherengagementtype = initData.gnext_ifotherengagementtype;
			this.gnext_officerservingiasvolunteer = initData.gnext_officerservingiasvolunteer;
			this.gnext_officerprefix = initData.gnext_officerprefix;
			this.gnext_agencypointofcontactzip = initData.gnext_agencypointofcontactzip;
			this.gnext_injurycasuedbyintentionalmisconduct_wfs = initData.gnext_injurycasuedbyintentionalmisconduct_wfs;
			this.gnext_officersdateofinjuryordeath = initData.gnext_officersdateofinjuryordeath;
			this.gnext_injurytypechemicals = initData.gnext_injurytypechemicals;
			this.gnext_officerservingascontractor = initData.gnext_officerservingascontractor;
			this.gnext_injurytypeheartattackname = initData.gnext_injurytypeheartattackname;
			this.traversedpath = initData.traversedpath;
			this.gnext_determinedmedicalretirementname = initData.gnext_determinedmedicalretirementname;
			this.gnext_officerintenttobringaboutownharm_wfs = initData.gnext_officerintenttobringaboutownharm_wfs;
			this.gnext_officerengagedinactivityauthorizedtoenganame = initData.gnext_officerengagedinactivityauthorizedtoenganame;
			this.gnext_injurytypephysicalblowsname = initData.gnext_injurytypephysicalblowsname;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.gnext_agencypocprefix = initData.gnext_agencypocprefix;
			this.gnext_filedstatelineofdutydeathbenefitsname = initData.gnext_filedstatelineofdutydeathbenefitsname;
			this.gnext_agencypocprefixname = initData.gnext_agencypocprefixname;
			this.gnext_agencyclassification = initData.gnext_agencyclassification;
			this.gnext_injurytypeother = initData.gnext_injurytypeother;
			this.owneridtype = initData.owneridtype;
			this.gnext_officersfirstname = initData.gnext_officersfirstname;
			this.gnext_agencypointofcontactjobtitle = initData.gnext_agencypointofcontactjobtitle;
			this.gnext_determineddcretirementanddisabilityact = initData.gnext_determineddcretirementanddisabilityact;
			this.gnext_grossnegligenceexplanation = initData.gnext_grossnegligenceexplanation;
			this.gnext_agencyheadalternatephonenumber = initData.gnext_agencyheadalternatephonenumber;
			this.gnext_officerintenttobringaboutownharm_wfsname = initData.gnext_officerintenttobringaboutownharm_wfsname;
			this.gnext_officerprefixname = initData.gnext_officerprefixname;
			this.gnext_describeotherfiled = initData.gnext_describeotherfiled;
			this.owneridname = initData.owneridname;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.gnext_agencypointofcontactaddressline2 = initData.gnext_agencypointofcontactaddressline2;
			this.gnext_injurytypeheartattack = initData.gnext_injurytypeheartattack;
			this.gnext_agencypocprefixother = initData.gnext_agencypocprefixother;
			this.gnext_agencyheadstate_other = initData.gnext_agencyheadstate_other;
			this.gnext_agencyheadfirstname = initData.gnext_agencyheadfirstname;
			this.gnext_officersdateofbirth = initData.gnext_officersdateofbirth;
			this.gnext_whatwasthedateofinjury = initData.gnext_whatwasthedateofinjury;
			this.gnext_injurytypevasularrupture = initData.gnext_injurytypevasularrupture;
			this.gnext_officersuffix = initData.gnext_officersuffix;
			this.gnext_isinjurybasedonaseptember112001exposurename = initData.gnext_isinjurybasedonaseptember112001exposurename;
			this.owningteam = initData.owningteam;
			this.gnext_accountidname = initData.gnext_accountidname;
			this.gnext_officerengagedinpublicssafetyortraining = initData.gnext_officerengagedinpublicssafetyortraining;
			this.gnext_statementofcircumstance = initData.gnext_statementofcircumstance;
			this.gnext_country = initData.gnext_country;
			this.gnext_upload24houractivityreport = initData.gnext_upload24houractivityreport;
			this.gnext_injurytypeexplosivesname = initData.gnext_injurytypeexplosivesname;
			this.gnext_injurytypevehicleboatairplanehelicoptername = initData.gnext_injurytypevehicleboatairplanehelicoptername;
			this.gnext_dutystatusother = initData.gnext_dutystatusother;
			this.gnext_certificationofapplication = initData.gnext_certificationofapplication;
			this.gnext_numberofotherbeneficiariesname = initData.gnext_numberofotherbeneficiariesname;
			this.gnext_injurytypeelectricityname = initData.gnext_injurytypeelectricityname;
			this.gnext_indicationofvoluntaryintoxication_wfs = initData.gnext_indicationofvoluntaryintoxication_wfs;
			this.gnext_typeofinjury = initData.gnext_typeofinjury;
			this.gnext_agencyheadprefixname = initData.gnext_agencyheadprefixname;
			this.gnext_nootherbenefitsfiled = initData.gnext_nootherbenefitsfiled;
			this.gnext_psadeathreporteridname = initData.gnext_psadeathreporteridname;
			this.gnext_determinedsocialsecurity = initData.gnext_determinedsocialsecurity;
			this.gnext_officerintenttoselfharmexplanation = initData.gnext_officerintenttoselfharmexplanation;
			this.gnext_createpsorecord = initData.gnext_createpsorecord;
			this.gnext_toxicologyanalysisperformed_wfsname = initData.gnext_toxicologyanalysisperformed_wfsname;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.gnext_determinedworkerscompensation = initData.gnext_determinedworkerscompensation;
			this.gnext_determineddcretirementanddisabilityactname = initData.gnext_determineddcretirementanddisabilityactname;
			this.gnext_uploadstatementofcircumstancename = initData.gnext_uploadstatementofcircumstancename;
			this.gnext_partbsubmissionstatus = initData.gnext_partbsubmissionstatus;
			this.gnext_zipcode = initData.gnext_zipcode;
			this._ownerid_value = initData._ownerid_value;
			this.gnext_fileddcretirementanddisabilityactname = initData.gnext_fileddcretirementanddisabilityactname;
			this.gnext_injurytypestressorstrainname = initData.gnext_injurytypestressorstrainname;
			this.gnext_actionswithinprimaryjurisdiction = initData.gnext_actionswithinprimaryjurisdiction;
			this.gnext_officerintenttobringaboutownharmname = initData.gnext_officerintenttobringaboutownharmname;
			this.gnext_city = initData.gnext_city;
			this.gnext_otherbenefitsfiled = initData.gnext_otherbenefitsfiled;
			this.gnext_dutystatus = initData.gnext_dutystatus;
			this.gnext_injurytypeexplosives = initData.gnext_injurytypeexplosives;
			this.gnext_causeofinjuryother = initData.gnext_causeofinjuryother;
			this.gnext_determinedfederalemployeescompact = initData.gnext_determinedfederalemployeescompact;
			this._gnext_psorecordid_value = initData._gnext_psorecordid_value;
			this.gnext_employingagencyemailaddress = initData.gnext_employingagencyemailaddress;
			this.gnext_injoryordeathcausedbybeneficiaryname = initData.gnext_injoryordeathcausedbybeneficiaryname;
			this.gnext_isinjurybasedonaseptember112001exposure = initData.gnext_isinjurybasedonaseptember112001exposure;
			this.gnext_agencypointofcontactphonenumber = initData.gnext_agencypointofcontactphonenumber;
			this.gnext_dutystatusname = initData.gnext_dutystatusname;
			this.gnext_state = initData.gnext_state;
			this.gnext_requireddocumentsuploadedorjustified = initData.gnext_requireddocumentsuploadedorjustified;
			this.gnext_determinedstatelineofdutydeathbenefitsname = initData.gnext_determinedstatelineofdutydeathbenefitsname;
			this.createdbyname = initData.createdbyname;
			this.gnext_authorizedtorepresentname = initData.gnext_authorizedtorepresentname;
			this.gnext_officerengagedinauthorizedactivities = initData.gnext_officerengagedinauthorizedactivities;
			this.gnext_injurytypeelectricity = initData.gnext_injurytypeelectricity;
			this.gnext_injurytypevehicleboatairplanehelicopter = initData.gnext_injurytypevehicleboatairplanehelicopter;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.gnext_nootherbenefitsfiledname = initData.gnext_nootherbenefitsfiledname;
			this.gnext_filedfederalemployeescompensationact = initData.gnext_filedfederalemployeescompensationact;
			this.gnext_agencypocinfosameasemployingagency = initData.gnext_agencypocinfosameasemployingagency;
			this.gnext_filedworkerscompensationname = initData.gnext_filedworkerscompensationname;
			this.gnext_officergrossnegligencename = initData.gnext_officergrossnegligencename;
			this.gnext_agencypointofcontactemailaddress = initData.gnext_agencypointofcontactemailaddress;
			this.gnext_officeremployedinnoncivilianmilitarycapname = initData.gnext_officeremployedinnoncivilianmilitarycapname;
			this.gnext_agencyheadinfosameasemployingagencyname = initData.gnext_agencyheadinfosameasemployingagencyname;
			this.gnext_agencyheadlastname = initData.gnext_agencyheadlastname;
			this.gnext_injurytypestrokename = initData.gnext_injurytypestrokename;
			this.gnext_readytosubmitapplication = initData.gnext_readytosubmitapplication;
			this.gnext_injurytypeclimaticconditions = initData.gnext_injurytypeclimaticconditions;
			this.gnext_addressline2 = initData.gnext_addressline2;
			this.gnext_officersmiddlename = initData.gnext_officersmiddlename;
			this.gnext_describeotherdetermination = initData.gnext_describeotherdetermination;
			this.gnext_officerengagedinpublicssafetyortrainingname = initData.gnext_officerengagedinpublicssafetyortrainingname;
			this.gnext_datereceived = initData.gnext_datereceived;
			this.gnext_agencyheadjobtitle = initData.gnext_agencyheadjobtitle;
			this.gnext_specifyifotherinjurytype = initData.gnext_specifyifotherinjurytype;
			this._stageid_value = initData._stageid_value;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.gnext_injurytypesharpinstrumentsbluntobjectsname = initData.gnext_injurytypesharpinstrumentsbluntobjectsname;
			this.gnext_determinedstatelineofdutydeathbenefits = initData.gnext_determinedstatelineofdutydeathbenefits;
			this.gnext_determinedmedicalretirement = initData.gnext_determinedmedicalretirement;
			this.gnext_officergrossnegligence = initData.gnext_officergrossnegligence;
			this.gnext_filedmedicalretirement = initData.gnext_filedmedicalretirement;
			this.gnext_officerservingascontractorname = initData.gnext_officerservingascontractorname;
			this.gnext_upload24houractivityreportname = initData.gnext_upload24houractivityreportname;
			this.gnext_certificationofapplicationname = initData.gnext_certificationofapplicationname;
			this.gnext_agencypocsuffix = initData.gnext_agencypocsuffix;
			this.gnext_injurytypeoccupationaldiseasename = initData.gnext_injurytypeoccupationaldiseasename;
			this.gnext_actionswithinprimaryjurisdictionname = initData.gnext_actionswithinprimaryjurisdictionname;
			this.importsequencenumber = initData.importsequencenumber;
			this.gnext_otherbenefitsfiledname = initData.gnext_otherbenefitsfiledname;
			this.gnext_officersphonenumber = initData.gnext_officersphonenumber;
			this.gnext_officeremployedinnoncivilianmilita_wfsname = initData.gnext_officeremployedinnoncivilianmilita_wfsname;
			this.gnext_psareporttypename = initData.gnext_psareporttypename;
			this.gnext_applicanttype = initData.gnext_applicanttype;
			this.gnext_officergrossnegligence_wfs = initData.gnext_officergrossnegligence_wfs;
			this.gnext_injurytypeinfectiousdiseasename = initData.gnext_injurytypeinfectiousdiseasename;
			this.gnext_officersdateofmedicalretirement = initData.gnext_officersdateofmedicalretirement;
			this.gnext_determineworkerscompensation = initData.gnext_determineworkerscompensation;
			this.gnext_readytosubmitapplicationname = initData.gnext_readytosubmitapplicationname;
			this.gnext_atthetimeofinurythatresultedindeathname = initData.gnext_atthetimeofinurythatresultedindeathname;
			this.gnext_indicationofvoluntaryintoxicationexplanat = initData.gnext_indicationofvoluntaryintoxicationexplanat;
			this.gnext_injoryordeathcausedbybeneficiary = initData.gnext_injoryordeathcausedbybeneficiary;
			this.gnext_psorecordidname = initData.gnext_psorecordidname;
			this.gnext_applicanttypename = initData.gnext_applicanttypename;
			this.gnext_psadeathreporteridyominame = initData.gnext_psadeathreporteridyominame;
			this.gnext_injurytypesharpinstrumentsbluntobjects = initData.gnext_injurytypesharpinstrumentsbluntobjects;
			this.gnext_datesubmittedcalculated = initData.gnext_datesubmittedcalculated;
			this.gnext_injurytyperadiation = initData.gnext_injurytyperadiation;
			this.gnext_agencyheadstatename = initData.gnext_agencyheadstatename;
			this.modifiedbyname = initData.modifiedbyname;
			this.gnext_statename = initData.gnext_statename;
			this.gnext_injurytypestroke = initData.gnext_injurytypestroke;
			this.gnext_determinedsept11victimcompfund = initData.gnext_determinedsept11victimcompfund;
			this.gnext_officeremployedinnoncivilianmilita_wfs = initData.gnext_officeremployedinnoncivilianmilita_wfs;
			this.gnext_injurytypechemicalsname = initData.gnext_injurytypechemicalsname;
			this.gnext_otherbenefitsdetermined = initData.gnext_otherbenefitsdetermined;
			this.gnext_officerengagedinactivityauthorizedtoenga = initData.gnext_officerengagedinactivityauthorizedtoenga;
			this.gnext_fileddcretirementanddisabilityact = initData.gnext_fileddcretirementanddisabilityact;
			this.gnext_injurytypestressorstrain = initData.gnext_injurytypestressorstrain;
			this.gnext_officeremployedinnonciviliancapexplanatio = initData.gnext_officeremployedinnonciviliancapexplanatio;
			this.modifiedby = initData.modifiedby;
			this.gnext_filedworkerscompensation = initData.gnext_filedworkerscompensation;
			this.gnext_agencyheadcity = initData.gnext_agencyheadcity;
			this.gnext_agencyheadphonenumber = initData.gnext_agencyheadphonenumber;
			this.gnext_agencypocstatename = initData.gnext_agencypocstatename;
			this.gnext_indicationofvoluntaryintoxication = initData.gnext_indicationofvoluntaryintoxication;
			this.gnext_injurytypeviralinfection = initData.gnext_injurytypeviralinfection;
			this.gnext_extraordinaryrequestbyemployingagencyname = initData.gnext_extraordinaryrequestbyemployingagencyname;
			
            this.id = initData.gnext_pso_deathreportid;
        }
    }
	
    /** @description Collection interface for Incident
     */  
	export interface IIncidents extends IRetrieveMultipleData<IIncident> { }
    /** @description WebAPI interface for Incident
     */  
    export interface IIncident {
        [key: string]: string | number
        gnext_legalcomplexity?: number
		gnext_legalscoringcompleteddate?: string
		new_benefitsparalegalspecialist?: string
		gnext_draftingcondolencedatecompleted?: string
		gnext_applicationsunsubmitted_state?: number
		new_911column7vcf2awardtotal?: string
		gnext_applicationstartedflag?: string
		gnext_markcaseasclosedname?: number
		new_generaljobclassificationleffetc?: string
		gnext_totaldaysopen?: number
		gnext_totaltimecustomerresourcecenter?: number
		gnext_bypassnotification?: string
		gnext_psoagency?: string
		gnext_totaltimenotificationfinal?: number
		_gnext_psostateid_value?: string
		numberofchildincidents?: number
		gnext_typeofofficerother?: string
		gnext_signnotificationlettersdate?: string
		gnext_bypassbenefitsspecialistreviewname?: number
		gnext_benefitsspecialistsignature?: string
		new_911claimx?: string
		gnext_psoblegaladvisoryominame?: string
		gnext_finalizingdeterminationdatecompleted?: string
		gnext_abandonmentnotification2date?: string
		new_notes?: string
		gnext_employmentstatusname?: number
		gnext_bypasspreapplicationname?: number
		gnext_econdolencesentdate?: string
		adx_stepstoreproduce?: string
		gnext_bypassapplication?: string
		gnext_commitment3value?: string
		_slaid_value?: string
		gnext_reviewingapplicationstartdate?: string
		casetypecodename?: number
		gnext_claimnumberassigned?: string
		gnext_preabandonmentsentname?: number
		new_federalappealdecisionadorpending?: string
		gnext_bjadirectordeemedabandoneddate?: string
		gnext_preapplicationstartdate?: string
		gnext_bypasscustomerresourcecenterreview?: string
		gnext_signnotificationlettersname?: number
		gnext_estimatedcompletiondate?: string
		new_datebenefitsspecialistassigned?: string
		gnext_nonactivitywarning1?: string
		gnext_applicationverifiedflagname?: number
		responsiblecontactidname?: string
		gnext_legaladvisorassignedname?: number
		gnext_internalclosurestatusname?: number
		gnext_lastddstagename?: string
		parentcaseidname?: string
		gnext_bypasslegaladvisorreview?: string
		gnext_addressconfirmation?: string
		gnext_mailingcompletingclaimstartdate?: string
		statuscodename?: number
		gnext_bypassclaimantagencyfollowupname?: number
		gnext_crcspecialistreviewcompleteddate?: string
		gnext_plcaareviewplannedduration?: number
		_stageid_value?: string
		gnext_bypasspsobdirectorreviewname?: number
		gnext_bypasscustomerresourcecenterreviewname?: number
		gnext_onholdreasonidname?: string
		gnext_psoblegaladvisorname?: string
		gnext_claimantagencyfollowupdatestartdate?: string
		gnext_lastimestagename?: string
		gnext_bypassnotificationdate?: string
		gnext_psobresourcecenter2yominame?: string
		gnext_aggregatescore?: number
		gnext_claimantagencyfollowupdateenddate?: string
		prioritycode?: string
		gnext_collaboration?: string
		gnext_imepacketpreparationdatecompleted?: string
		gnext_psobscoringcompletedname?: number
		gnext_precommitment3valuename?: number
		gnext_psorecordonspecialhold?: string
		new_dateofoutreachcompletion?: string
		new_dateofnoticeofbjadirectorappeal?: string
		gnext_obligation3value?: string
		gnext_applicationvalidatedname?: number
		incidentstagecodename?: number
		modifiedbyexternalparty?: string
		new_911column5registeredforvcf2fundx?: string
		gnext_precommitment3value?: string
		owneridtype?: string
		gnext_psobdirectorreviewdate?: string
		gnext_preadoptionanticipated?: string
		gnext_claimsummaryformcompleteddate?: string
		_msa_partnerid_value?: string
		gnext_totalplannedstagedurations?: number
		checkemail?: string
		new_hoappealoutcomeadorpending?: string
		gnext_describeotherprefix?: string
		gnext_partbsubmissionstatus?: string
		gnext_benefitsspecialistassigneddate?: string
		new_includedinvcfchartx?: string
		modifiedon?: string
		contactidname?: string
		title?: string
		gnext_aggregatescorecompiledname?: number
		gnext_attorneyadvisorreviewname?: number
		gnext_bypassscoringdate?: string
		gnext_bypassapplicationdate?: string
		_responsiblecontactid_value?: string
		gnext_filingextensionreceivedname?: number
		gnext_achformreceivedname?: number
		gnext_bypasslegaladvisorreviewname?: number
		owninguser?: string
		gnext_bypassocfo?: string
		gnext_benefitentitlementname?: number
		servicestage?: string
		customeridtype?: string
		gnext_benefitsspecialistreviewcompleteddate?: string
		gnext_bypassclaimantagencyfollowupdate?: string
		incidentstagecode?: string
		modifiedbyexternalpartyyominame?: string
		gnext_noticeofobligationtoocfo?: string
		gnext_commitmentdate?: string
		responseby?: string
		new_911column1numberofpotentialpsoeabene?: string
		caseorigincodename?: number
		gnext_optionsample2?: string
		gnext_bypassscoring?: string
		new_911column4vcf1awardtotal?: string
		gnext_customerresourcecenterenddate?: string
		gnext_psobscoringcompleteddate?: string
		new_additionalinfo?: string
		activitiescomplete?: string
		gnext_applicationassignedname?: number
		gnext_timesinceclaimcreated?: number
		gnext_internalclaimstagename?: number
		gnext_bypasslegaladvisorreviewdate?: string
		gnext_inserviceofname?: number
		blockedprofilename?: number
		gnext_packagedeterminationnotificationstartdate?: string
		gnext_psoaddress2?: string
		gnext_claimsummaryformcompletedname?: number
		gnext_psoaddress1?: string
		slaname?: string
		gnext_preapplicationenddate?: string
		new_motionforreconsiderationx?: string
		resolvebyslastatusname?: number
		_gnext_onholdreasonid_value?: string
		gnext_legaladvisorassigneddate?: string
		gnext_psossnlastfour?: string
		gnext_prefixname?: number
		new_outreachspecialist?: string
		sentimentvalue?: number
		gnext_abandonmentnotification3date?: string
		new_datebjadirectordeterminationsigned?: string
		gnext_psocity?: string
		gnext_dcretirementdisabilityname?: number
		gnext_bypasssrbenefitsspecialistreview?: string
		gnext_colorcodename?: number
		gnext_seniorbenefitsspecialistreviewcompletedda?: string
		owneridyominame?: string
		gnext_legalreviewenddate?: string
		activitiescompletename?: number
		entitlementidname?: string
		mergedname?: number
		gnext_benefitsawardedname?: number
		gnext_benefitsspecialistsignaturedate?: string
		_masterid_value?: string
		adx_createdbyipaddress?: string
		transactioncurrencyidname?: string
		_gnext_publicsafetyagencyid_value?: string
		gnext_claimnumberassigneddate?: string
		adx_publishtoweb?: string
		gnext_bypassclaimantagencyfollowup?: string
		createdby?: string
		gnext_bypasspsobdirectorreviewdate?: string
		gnext_bypassplcaareview?: string
		gnext_psoemployedatthetime?: string
		gnext_psobdirectorreviewstartdate?: string
		contractservicelevelcodename?: number
		gnext_psobbenefitsspecialistyominame?: string
		firstresponsesentname?: number
		existingcase?: string
		gnext_grossnegligence?: string
		gnext_imeselectionstartdate?: string
		gnext_preabandonmentdrafted?: string
		gnext_notification1?: string
		gnext_signnotificationletters?: string
		gnext_notification3?: string
		new_inactivestatuswave2noticeofintentto?: string
		gnext_applicationstartdate?: string
		gnext_bypassocfofaad?: string
		gnext_notificationfinalstartdate?: string
		gnext_psolegaladvisoremail?: string
		gnext_withdrawalrequestreceived?: string
		gnext_applicationvalidated?: string
		new_federalappealpetitionernameofcasedo?: string
		gnext_draftdeterminationcompletedname?: number
		responsiblecontactidyominame?: string
		gnext_employeecompensationactname?: number
		gnext_followuprequested?: string
		gnext_draftingecondolencename?: number
		gnext_applicationreviewedtimely?: string
		gnext_appealsholdname?: number
		gnext_ocfofaadenddate?: string
		new_911column6awardedvcf2fundx?: string
		gnext_srbenefitsspecialistyominame?: string
		gnext_psozipcode?: string
		_gnext_independentmedicalexaminarid_value?: string
		gnext_seniorbenefitsspecialistreviewplanneddura?: number
		gnext_aggregatescorecompileddate?: string
		gnext_econdolencesent?: string
		prioritycodename?: number
		gnext_packagedeterminationnotificationdatecompl?: string
		gnext_stopclaimtimers?: string
		new_totalbenefitamount?: string
		new_dateofinactivestatuswave1outreachlette?: string
		gnext_notificationplannedduration?: number
		gnext_ocfostartdate?: string
		new_typeofclaimdeathordisability?: string
		gnext_totaltimeocfo?: number
		gnext_ocfofaadplannedduration?: number
		adx_resolution?: string
		gnext_partbsubmissionstatusname?: number
		gnext_decommitted?: string
		gnext_bypassocfofaadname?: number
		gnext_totaltimesrbenefitsspecreview?: number
		new_sourceof911cod?: string
		_productid_value?: string
		gnext_lastdecommitedyregdate?: string
		gnext_claimantagencyfollowup?: number
		gnext_optionsample2name?: number
		gnext_bypassbenefitsspecialistreview?: string
		modifiedbyexternalpartyname?: string
		new_congressionalinquiryx?: string
		gnext_totaltimeclaimantagencyfollowup?: number
		gnext_grossnegligencename?: number
		_gnext_relatedpsorecordsid_value?: string
		severitycodename?: number
		gnext_collaborationname?: number
		gnext_ocfoplannedduration?: number
		new_psobofficeoutcomeapprovaladenialdorp?: string
		gnext_applicationassigned?: string
		adx_supportplan?: string
		gnext_appealsholddate?: string
		gnext_inserviceofother?: string
		_msa_partnercontactid_value?: string
		gnext_activitiescompletedate?: string
		incidentid?: string
		socialprofileidname?: string
		new_hearingofficerassigned?: string
		gnext_preabandonmentsent?: string
		gnext_customerresourcecenterstartdate?: string
		contractdetailidname?: string
		gnext_draftnotificationletters?: string
		new_911column8vcfawardpaymenttodate?: string
		gnext_scoringclaimstartdate?: string
		gnext_seniorbenefitsspecialistsignaturedate?: string
		new_remandedclaimx?: string
		gnext_preapplicationplannedduration?: number
		gnext_optionsample?: string
		gnext_bypasssrbenefitsspecialistreviewdate?: string
		gnext_attorneyadvisorreview?: string
		productserialnumber?: string
		new_federalappealx?: string
		customersatisfactioncode?: string
		gnext_benefitentitlement?: string
		masteridname?: string
		gnext_psobportaluseridyominame?: string
		gnext_ocfofaadstartdate?: string
		gnext_applicationreceived?: string
		gnext_econdolencesentname?: number
		gnext_draftnotificationlettersdate?: string
		productidname?: string
		gnext_independentmedicalexaminaridyominame?: string
		gnext_psobbenefitsspecialistname?: string
		gnext_applicationstartedflagname?: number
		gnext_addressconfirmationname?: number
		gnext_seniorbenefitsspecialistreviewcompleted?: string
		gnext_withdrawalrequestreceivedname?: number
		firstresponsebykpiidname?: string
		_subjectid_value?: string
		gnext_obligation3valuename?: number
		gnext_seniorbenefitsspecialistsignature?: string
		gnext_benefitsspecialistreviewcompletedname?: number
		gnext_bypassplcaareviewname?: number
		gnext_typeofofficername?: number
		new_durationofdeterminationprocessindaysfro?: string
		gnext_applicationenddate?: string
		slainvokedidname?: string
		customercontacted?: string
		gnext_applicationsvalidated?: number
		gnext_nonactivitywarning1name?: number
		gnext_applicationlinkedname?: number
		firstresponseslastatus?: string
		new_administrativecloseoutneededforhoappeal?: string
		gnext_draftnotificationlettersname?: number
		gnext_psoblegaladvisor?: string
		gnext_lastpsastatus?: string
		new_reasonforbjadirectordenial?: string
		contactidyominame?: string
		gnext_bypasspreapplication?: string
		_resolvebykpiid_value?: string
		gnext_psocountry?: string
		timezoneruleversionnumber?: number
		gnext_legalscoringcompleted?: string
		gnext_abandonmentnotification1date?: string
		gnext_achformvalidated?: string
		gnext_imepacketcompleteddate?: string
		gnext_psolegaladvisorphone?: string
		gnext_imereviewedqcdate?: string
		escalatedon?: string
		primarycontactidname?: string
		createdbyexternalpartyname?: string
		gnext_psobdirectorreviewenddate?: string
		gnext_psobresourceyominame?: string
		new_specificissueforissuecase?: string
		gnext_bypasspsobdirectorreview?: string
		gnext_filingextensionreceived?: string
		gnext_filingextensionreviewed?: string
		gnext_bypasssrbenefitsspecialistreviewname?: number
		gnext_totaltimescoring?: number
		new_claimscore?: string
		importsequencenumber?: number
		merged?: string
		new_positiontitlespecificorexpanded?: string
		gnext_applicationverifiedflag?: string
		owneridname?: string
		new_dayspendingtodate?: string
		gnext_psostate?: string
		new_exactdurationofbenefitsspecialistreview?: string
		gnext_filingextensionresponsesent?: string
		createdon?: string
		gnext_psobscoringcompleted?: string
		msa_partneridname?: string
		gnext_psobdirectorsignaturedate?: string
		gnext_draftingcondolencestartdate?: string
		adx_createdbyusername?: string
		gnext_employeecompensationact?: string
		new_durationfromdateclaimnumberassignedtod?: string
		gnext_applicationssubmitted_state?: number
		gnext_ocfoenddate?: string
		gnext_dateofdeath?: string
		gnext_psovalidatedstatusname?: number
		gnext_benefitsspecialistreviewcompleted?: string
		lastonholdtime?: string
		blockedprofile?: string
		resolvebykpiidname?: string
		gnext_bypassocfodate?: string
		gnext_intentionaldeath?: string
		gnext_notificationstartdate?: string
		gnext_timesincecreation?: number
		gnext_withdrawalacknowledgmentlettersent?: string
		entityimage_timestamp?: number
		gnext_dateofinjury?: string
		new_durationoflegalreviewprocessatpsoboffi?: string
		new_hearingofficerhoappealx?: string
		gnext_socialsecuritynumber?: string
		gnext_followuprequesteddate?: string
		gnext_lastname?: string
		gnext_notificationenddate?: string
		msa_partnercontactidyominame?: string
		gnext_applicationsvalidated_state?: number
		customeridname?: string
		gnext_sendnotificationlettersname?: number
		gnext_accessingclaimdatecompleted?: string
		modifiedbyyominame?: string
		gnext_lastchildentityupdateddate?: string
		new_hearingdate?: string
		gnext_firstname?: string
		_ownerid_value?: string
		followuptaskcreated?: string
		gnext_applicationsubmittedflagname?: number
		gnext_inserviceof?: string
		new_911column3awardedvcf1benefitx?: string
		gnext_officernamesuffix?: string
		gnext_totalactualstagedurations?: number
		new_datacontrolnumberdcnyregdocnumber?: string
		billedserviceunits?: number
		versionnumber?: number
		gnext_seniorbenefitsspecialistreviewenddate?: string
		gnext_applicationsunsubmitted?: number
		gnext_addressconfirmationdate?: string
		gnext_reviewnotificationletters?: string
		new_assignedlegaladvisorla?: string
		actualserviceunits?: number
		gnext_srbenefitsspecialist?: string
		gnext_lastpsastatusname?: number
		gnext_applicationsubmittedflag?: string
		messagetypecode?: string
		gnext_psorecordonspecialholdname?: number
		gnext_precommitment?: string
		gnext_decommittedname?: number
		exchangerate?: number
		gnext_benefitsawarded?: string
		gnext_dcretirementdisability?: string
		gnext_plcaasignaturename?: number
		followupby?: string
		gnext_internalclosurestatus?: string
		accountidyominame?: string
		gnext_collaborationdate?: string
		gnext_draftdeterminationcompleteddate?: string
		gnext_applicationsunsubmitted_date?: string
		gnext_stopclaimtimersname?: number
		gnext_mailingcompletingclaimdatecompleted?: string
		gnext_psovalidatedstatus?: string
		createdbyyominame?: string
		new_dateofincidentdeathordisability?: string
		gnext_applicationsvalidated_date?: string
		gnext_bypassocfoname?: number
		gnext_psorecordonhold?: string
		new_bjadirectorappealoutcomeadorpending?: string
		gnext_psobresourcecenter2name?: string
		gnext_totaltimeplcaareview?: number
		gnext_followupreceived?: string
		new_durationofoutreachindaysfromoutreachas?: string
		gnext_applicationpartb_date?: string
		gnext_performinglegalreviewdatecompleted?: string
		adx_modifiedbyipaddress?: string
		gnext_filingextensionresponsesentname?: number
		gnext_sendnotificationletters?: string
		_accountid_value?: string
		gnext_plcaasignature?: string
		kbarticleidname?: string
		gnext_draftingecondolencedate?: string
		gnext_precommitmentdate?: string
		gnext_imepacketsentdate?: string
		gnext_totaltimelegalreview?: number
		gnext_totaltimeapplication?: number
		gnext_publicsafetyagencyidname?: string
		gnext_abandonmentletterrevieweddate?: string
		gnext_srbenefitsspecialistname?: string
		_slainvokedid_value?: string
		accountidname?: string
		gnext_legaladvisorreview?: string
		gnext_dateofbirth?: string
		gnext_psorecordnumberassigneddate?: string
		gnext_totaltimeocfofaad?: number
		new_911column2relatedpsoeaclaims?: string
		new_causeofdeathcod?: string
		gnext_nulldatefield?: string
		gnext_psobresourcename?: string
		gnext_optionsamplename?: number
		gnext_notificationfinalenddate?: string
		gnext_legalreviewplannedduration?: number
		gnext_prefix?: string
		_primarycontactid_value?: string
		gnext_reviewnotificationlettersname?: number
		new_agency?: string
		gnext_draftingdeterminationdatecompleted?: string
		adx_supportplanname?: string
		gnext_applicationssubmitted_date?: string
		new_psobofficedeterminationx?: string
		gnext_factualcomplexity?: number
		gnext_commitment?: string
		gnext_plcaasignaturedate?: string
		gnext_abandonmentletterdrafteddate?: string
		customeridyominame?: string
		gnext_claimassessmentplannedduration?: number
		firstresponsesent?: string
		createdbyexternalparty?: string
		gnext_buildingapplicationstartdate?: string
		statuscode?: string
		gnext_performinglegalreviewstartdate?: string
		gnext_seniorbenefitsspecialistreviewstartdate?: string
		gnext_imereceiveddate?: string
		entityimage_url?: string
		gnext_psoaddress3?: string
		adx_resolutiondate?: string
		createdbyname?: string
		_contractdetailid_value?: string
		subjectidname?: string
		new_durationofhearingofficerappealprocessin?: string
		gnext_imepacketpreparationstartdate?: string
		new_issuecasesclaimsonholdbefore52013tra?: string
		gnext_currentdatetime?: string
		firstresponseslastatusname?: number
		routecase?: string
		gnext_commitment3valuename?: number
		gnext_socialsecuritynumberprefix?: string
		gnext_withdrawalacknowledgmentlettersentname?: number
		adx_supportrequestname?: string
		gnext_totaltimenotification?: number
		gnext_followupreceiveddate?: string
		gnext_psobbenefitsspecialist?: string
		gnext_notificationfinalplannedduration?: number
		gnext_legaladvisorreviewname?: number
		gnext_paymentmade?: string
		gnext_reviewingapplicationdatecompleted?: string
		gnext_scoringclaimdatecompleted?: string
		gnext_relatedpsorecordsidname?: string
		new_reasonforhodenial?: string
		gnext_markcaseasclosed?: string
		gnext_psoemployedatthetimename?: number
		primarycontactidyominame?: string
		gnext_psobresource?: string
		gnext_achformreceiveddate?: string
		gnext_intentionalmisconductname?: number
		gnext_psofullname?: string
		gnext_lastprocessname?: string
		gnext_appealshold?: string
		gnext_paymentmadedate?: string
		gnext_psaapplicationsubmittedname?: number
		gnext_plcaareviewstartdate?: string
		owningbusinessunit?: string
		_gnext_psobportaluserid_value?: string
		contractidname?: string
		checkemailname?: number
		gnext_psaapplicationsubmitted?: string
		gnext_colorcode?: string
		gnext_preabandonmentreviewedname?: number
		gnext_psobdirectorsignature?: string
		gnext_legaladvisorreviewdate?: string
		gnext_draftingecondolence?: string
		_entityimageid_value?: string
		gnext_psorecordonholdname?: number
		createdonbehalfbyname?: string
		gnext_imereceiptstartdate?: string
		gnext_plcaareviewenddate?: string
		utcconversiontimezonecode?: number
		gnext_imereceiptdatecompleted?: string
		modifiedonbehalfby?: string
		modifiedbyname?: string
		gnext_paymentmadename?: number
		_transactioncurrencyid_value?: string
		customersatisfactioncodename?: number
		statecode?: number
		gnext_seniorbenefitsspecialistsignaturename?: number
		new_datehodeterminationsigned?: string
		gnext_efficiency?: number
		adx_modifiedbyusername?: string
		isescalatedname?: number
		new_dateofnoticeofhoappeal?: string
		_entitlementid_value?: string
		_parentcaseid_value?: string
		gnext_notification2?: string
		gnext_applicationpartblookup?: string
		gnext_publicsafetyagencyidyominame?: string
		new_bjadirectorappealx?: string
		gnext_applicationplannedduration?: number
		gnext_applicationpartb?: number
		gnext_activeyregnumber?: string
		gnext_achformvalidateddate?: string
		new_specificcauseofdeathfromdeathcertificat?: string
		gnext_followuprequestedname?: number
		gnext_reviewnotificationlettersdate?: string
		gnext_bypassnotificationname?: number
		gnext_applicationreceivedname?: number
		isdecrementingname?: number
		gnext_intentionaldeathname?: number
		gnext_bypassapplicationname?: number
		servicestagename?: number
		gnext_totaltimepsobdirectorreview?: number
		followuptaskcreatedname?: number
		gnext_buildingapplicationdatecompleted?: string
		gnext_noticeofobligationtoocfoname?: number
		gnext_bypassplcaareviewdate?: string
		new_datesenttobudget?: string
		new_durationofentireclaimsprocessindaysfro?: string
		gnext_legalreviewstartdate?: string
		isdecrementing?: string
		createdonbehalfbyyominame?: string
		new_durationofbenefitsspecialistreviewinday?: string
		adx_supportrequest?: string
		_processid_value?: string
		gnext_psobdirectorreview?: string
		gnext_preabandonmentreviewed?: string
		gnext_precommitmentname?: number
		gnext_preabandonmentdraftedname?: number
		gnext_imeselectiondatecompleted?: string
		modifiedonbehalfbyyominame?: string
		description?: string
		gnext_benefitsspecialistassigned?: string
		gnext_noticeofobligationtoocfodate?: string
		gnext_typeofofficer?: string
		gnext_claimclassificationstartdate?: string
		gnext_independentmedicalexaminaridname?: string
		gnext_causeofdeath?: string
		new_inactivestatuswave1outreachletterx?: string
		gnext_internalclaimstage?: string
		gnext_attorneyadvisorreviewdate?: string
		gnext_bypassscoringname?: number
		gnext_applicationpartb_state?: number
		gnext_applicationpartblookupname?: string
		gnext_draftingdeterminationstartdate?: string
		gnext_draftdeterminationcompleted?: string
		statecodename?: number
		gnext_claimclassificationplannedduration?: number
		gnext_legaladvisorassigned?: string
		gnext_ocfo?: string
		decremententitlementtermname?: number
		_socialprofileid_value?: string
		_firstresponsebykpiid_value?: string
		gnext_applicationlinked?: string
		gnext_officerstitle?: string
		gnext_aggregatescorecompiled?: string
		gnext_totaldaysclaimopen?: number
		gnext_sendnotificationlettersdate?: string
		gnext_intentionalmisconduct?: string
		gnext_legalscoringcompletedname?: number
		gnext_filingextensionreviewedname?: number
		gnext_voluntaryintoxicationname?: number
		modifiedonbehalfbyname?: string
		resolveby?: string
		gnext_middlename?: string
		gnext_applicationreviewedtimelyname?: number
		gnext_abandonmentlettersentdate?: string
		gnext_benefitentitlementexplanation?: string
		gnext_achformvalidatedname?: number
		owningteam?: string
		messagetypecodename?: number
		caseorigincode?: string
		gnext_bypasspreapplcationdate?: string
		gnext_psobdirectorsignaturename?: number
		gnext_claimassessmentstartdate?: string
		adx_publishtowebname?: number
		new_hometownheroeshhdlax?: string
		gnext_bypasscustomerrescourcespecialistreviewda?: string
		casetypecode?: string
		traversedpath?: string
		_contactid_value?: string
		new_claimantsattorneyrepresentative?: string
		contractservicelevelcode?: string
		createdonbehalfby?: string
		new_dateofoutreachassignment?: string
		gnext_claimassessmentenddate?: string
		gnext_finalizingdeterminationstartdate?: string
		gnext_voluntaryintoxication?: string
		gnext_benefitsspecialistassignedname?: number
		gnext_preapplicationtotaltime?: number
		gnext_psobportaluseridname?: string
		gnext_claimsummaryformcompleted?: string
		gnext_psobdirectorreviewname?: number
		_customerid_value?: string
		isescalated?: string
		gnext_followupreceivedname?: number
		_contractid_value?: string
		modifiedby?: string
		new_reasonforpsobdenial?: string
		msa_partnercontactidname?: string
		gnext_applicationssubmitted?: number
		resolvebyslastatus?: string
		gnext_psostateidname?: string
		gnext_benefitsspecialistsignaturename?: number
		gnext_psobdirectorreviewplannedduration?: number
		gnext_claimclassificationenddate?: string
		gnext_achformreceived?: string
		gnext_employmentstatus?: string
		gnext_accessingclaimstartdate?: string
		gnext_totaltimebenefitsspecialistreview?: number
		gnext_imerequestsentdate?: string
		_kbarticleid_value?: string
		new_administrativecloseoutneeded?: string
		severitycode?: string
		gnext_customerresourcecenterplannedduration?: number
		decremententitlementterm?: string
		gnext_seniorbenefitsspecialistreviewcompletedname?: number
		new_dateofnoticeofintenttodeemclaimabando?: string
		new_durationofbjadirectorappealprocessinda?: string
		gnext_psostatename?: number
		gnext_activeyregnumbername?: string
		gnext_psotitle?: string
		createdbyexternalpartyyominame?: string
		onholdtime?: number
		msa_partneridyominame?: string
		gnext_bypassbenefitsspecialistreviewdate?: string
		gnext_causeofdeathname?: number
		ticketnumber?: string
		entityimage?: number
		gnext_commitmentname?: number
		gnext_psobresourcecenter2?: string
		influencescore?: number
		gnext_bypassocfofaaddate?: string
		overriddencreatedon?: string
		
    }
    /** @description Form Helper Class for Incident
     */ 
	export class IncidentForm {
		public gnext_legalcomplexity: string = "gnext_legalcomplexity";
		public gnext_legalscoringcompleteddate: string = "gnext_legalscoringcompleteddate";
		public new_benefitsparalegalspecialist: string = "new_benefitsparalegalspecialist";
		public gnext_draftingcondolencedatecompleted: string = "gnext_draftingcondolencedatecompleted";
		public gnext_applicationsunsubmitted_state: string = "gnext_applicationsunsubmitted_state";
		public new_911column7vcf2awardtotal: string = "new_911column7vcf2awardtotal";
		public gnext_applicationstartedflag: string = "gnext_applicationstartedflag";
		public gnext_markcaseasclosedname: string = "gnext_markcaseasclosedname";
		public new_generaljobclassificationleffetc: string = "new_generaljobclassificationleffetc";
		public gnext_totaldaysopen: string = "gnext_totaldaysopen";
		public gnext_totaltimecustomerresourcecenter: string = "gnext_totaltimecustomerresourcecenter";
		public gnext_bypassnotification: string = "gnext_bypassnotification";
		public gnext_psoagency: string = "gnext_psoagency";
		public gnext_totaltimenotificationfinal: string = "gnext_totaltimenotificationfinal";
		public gnext_psostateid: string = "gnext_psostateid";
		public numberofchildincidents: string = "numberofchildincidents";
		public gnext_typeofofficerother: string = "gnext_typeofofficerother";
		public gnext_signnotificationlettersdate: string = "gnext_signnotificationlettersdate";
		public gnext_bypassbenefitsspecialistreviewname: string = "gnext_bypassbenefitsspecialistreviewname";
		public gnext_benefitsspecialistsignature: string = "gnext_benefitsspecialistsignature";
		public new_911claimx: string = "new_911claimx";
		public gnext_psoblegaladvisoryominame: string = "gnext_psoblegaladvisoryominame";
		public gnext_finalizingdeterminationdatecompleted: string = "gnext_finalizingdeterminationdatecompleted";
		public gnext_abandonmentnotification2date: string = "gnext_abandonmentnotification2date";
		public new_notes: string = "new_notes";
		public gnext_employmentstatusname: string = "gnext_employmentstatusname";
		public gnext_bypasspreapplicationname: string = "gnext_bypasspreapplicationname";
		public gnext_econdolencesentdate: string = "gnext_econdolencesentdate";
		public adx_stepstoreproduce: string = "adx_stepstoreproduce";
		public gnext_bypassapplication: string = "gnext_bypassapplication";
		public gnext_commitment3value: string = "gnext_commitment3value";
		public slaid: string = "slaid";
		public gnext_reviewingapplicationstartdate: string = "gnext_reviewingapplicationstartdate";
		public casetypecodename: string = "casetypecodename";
		public gnext_claimnumberassigned: string = "gnext_claimnumberassigned";
		public gnext_preabandonmentsentname: string = "gnext_preabandonmentsentname";
		public new_federalappealdecisionadorpending: string = "new_federalappealdecisionadorpending";
		public gnext_bjadirectordeemedabandoneddate: string = "gnext_bjadirectordeemedabandoneddate";
		public gnext_preapplicationstartdate: string = "gnext_preapplicationstartdate";
		public gnext_bypasscustomerresourcecenterreview: string = "gnext_bypasscustomerresourcecenterreview";
		public gnext_signnotificationlettersname: string = "gnext_signnotificationlettersname";
		public gnext_estimatedcompletiondate: string = "gnext_estimatedcompletiondate";
		public new_datebenefitsspecialistassigned: string = "new_datebenefitsspecialistassigned";
		public gnext_nonactivitywarning1: string = "gnext_nonactivitywarning1";
		public gnext_applicationverifiedflagname: string = "gnext_applicationverifiedflagname";
		public responsiblecontactidname: string = "responsiblecontactidname";
		public gnext_legaladvisorassignedname: string = "gnext_legaladvisorassignedname";
		public gnext_internalclosurestatusname: string = "gnext_internalclosurestatusname";
		public gnext_lastddstagename: string = "gnext_lastddstagename";
		public parentcaseidname: string = "parentcaseidname";
		public gnext_bypasslegaladvisorreview: string = "gnext_bypasslegaladvisorreview";
		public gnext_addressconfirmation: string = "gnext_addressconfirmation";
		public gnext_mailingcompletingclaimstartdate: string = "gnext_mailingcompletingclaimstartdate";
		public statuscodename: string = "statuscodename";
		public gnext_bypassclaimantagencyfollowupname: string = "gnext_bypassclaimantagencyfollowupname";
		public gnext_crcspecialistreviewcompleteddate: string = "gnext_crcspecialistreviewcompleteddate";
		public gnext_plcaareviewplannedduration: string = "gnext_plcaareviewplannedduration";
		public stageid: string = "stageid";
		public gnext_bypasspsobdirectorreviewname: string = "gnext_bypasspsobdirectorreviewname";
		public gnext_bypasscustomerresourcecenterreviewname: string = "gnext_bypasscustomerresourcecenterreviewname";
		public gnext_onholdreasonidname: string = "gnext_onholdreasonidname";
		public gnext_psoblegaladvisorname: string = "gnext_psoblegaladvisorname";
		public gnext_claimantagencyfollowupdatestartdate: string = "gnext_claimantagencyfollowupdatestartdate";
		public gnext_lastimestagename: string = "gnext_lastimestagename";
		public gnext_bypassnotificationdate: string = "gnext_bypassnotificationdate";
		public gnext_psobresourcecenter2yominame: string = "gnext_psobresourcecenter2yominame";
		public gnext_aggregatescore: string = "gnext_aggregatescore";
		public gnext_claimantagencyfollowupdateenddate: string = "gnext_claimantagencyfollowupdateenddate";
		public prioritycode: string = "prioritycode";
		public gnext_collaboration: string = "gnext_collaboration";
		public gnext_imepacketpreparationdatecompleted: string = "gnext_imepacketpreparationdatecompleted";
		public gnext_psobscoringcompletedname: string = "gnext_psobscoringcompletedname";
		public gnext_precommitment3valuename: string = "gnext_precommitment3valuename";
		public gnext_psorecordonspecialhold: string = "gnext_psorecordonspecialhold";
		public new_dateofoutreachcompletion: string = "new_dateofoutreachcompletion";
		public new_dateofnoticeofbjadirectorappeal: string = "new_dateofnoticeofbjadirectorappeal";
		public gnext_obligation3value: string = "gnext_obligation3value";
		public gnext_applicationvalidatedname: string = "gnext_applicationvalidatedname";
		public incidentstagecodename: string = "incidentstagecodename";
		public modifiedbyexternalparty: string = "modifiedbyexternalparty";
		public new_911column5registeredforvcf2fundx: string = "new_911column5registeredforvcf2fundx";
		public gnext_precommitment3value: string = "gnext_precommitment3value";
		public owneridtype: string = "owneridtype";
		public gnext_psobdirectorreviewdate: string = "gnext_psobdirectorreviewdate";
		public gnext_preadoptionanticipated: string = "gnext_preadoptionanticipated";
		public gnext_claimsummaryformcompleteddate: string = "gnext_claimsummaryformcompleteddate";
		public msa_partnerid: string = "msa_partnerid";
		public gnext_totalplannedstagedurations: string = "gnext_totalplannedstagedurations";
		public checkemail: string = "checkemail";
		public new_hoappealoutcomeadorpending: string = "new_hoappealoutcomeadorpending";
		public gnext_describeotherprefix: string = "gnext_describeotherprefix";
		public gnext_partbsubmissionstatus: string = "gnext_partbsubmissionstatus";
		public gnext_benefitsspecialistassigneddate: string = "gnext_benefitsspecialistassigneddate";
		public new_includedinvcfchartx: string = "new_includedinvcfchartx";
		public modifiedon: string = "modifiedon";
		public contactidname: string = "contactidname";
		public title: string = "title";
		public gnext_aggregatescorecompiledname: string = "gnext_aggregatescorecompiledname";
		public gnext_attorneyadvisorreviewname: string = "gnext_attorneyadvisorreviewname";
		public gnext_bypassscoringdate: string = "gnext_bypassscoringdate";
		public gnext_bypassapplicationdate: string = "gnext_bypassapplicationdate";
		public responsiblecontactid: string = "responsiblecontactid";
		public gnext_filingextensionreceivedname: string = "gnext_filingextensionreceivedname";
		public gnext_achformreceivedname: string = "gnext_achformreceivedname";
		public gnext_bypasslegaladvisorreviewname: string = "gnext_bypasslegaladvisorreviewname";
		public owninguser: string = "owninguser";
		public gnext_bypassocfo: string = "gnext_bypassocfo";
		public gnext_benefitentitlementname: string = "gnext_benefitentitlementname";
		public servicestage: string = "servicestage";
		public customeridtype: string = "customeridtype";
		public gnext_benefitsspecialistreviewcompleteddate: string = "gnext_benefitsspecialistreviewcompleteddate";
		public gnext_bypassclaimantagencyfollowupdate: string = "gnext_bypassclaimantagencyfollowupdate";
		public incidentstagecode: string = "incidentstagecode";
		public modifiedbyexternalpartyyominame: string = "modifiedbyexternalpartyyominame";
		public gnext_noticeofobligationtoocfo: string = "gnext_noticeofobligationtoocfo";
		public gnext_commitmentdate: string = "gnext_commitmentdate";
		public responseby: string = "responseby";
		public new_911column1numberofpotentialpsoeabene: string = "new_911column1numberofpotentialpsoeabene";
		public caseorigincodename: string = "caseorigincodename";
		public gnext_optionsample2: string = "gnext_optionsample2";
		public gnext_bypassscoring: string = "gnext_bypassscoring";
		public new_911column4vcf1awardtotal: string = "new_911column4vcf1awardtotal";
		public gnext_customerresourcecenterenddate: string = "gnext_customerresourcecenterenddate";
		public gnext_psobscoringcompleteddate: string = "gnext_psobscoringcompleteddate";
		public new_additionalinfo: string = "new_additionalinfo";
		public activitiescomplete: string = "activitiescomplete";
		public gnext_applicationassignedname: string = "gnext_applicationassignedname";
		public gnext_timesinceclaimcreated: string = "gnext_timesinceclaimcreated";
		public gnext_internalclaimstagename: string = "gnext_internalclaimstagename";
		public gnext_bypasslegaladvisorreviewdate: string = "gnext_bypasslegaladvisorreviewdate";
		public gnext_inserviceofname: string = "gnext_inserviceofname";
		public blockedprofilename: string = "blockedprofilename";
		public gnext_packagedeterminationnotificationstartdate: string = "gnext_packagedeterminationnotificationstartdate";
		public gnext_psoaddress2: string = "gnext_psoaddress2";
		public gnext_claimsummaryformcompletedname: string = "gnext_claimsummaryformcompletedname";
		public gnext_psoaddress1: string = "gnext_psoaddress1";
		public slaname: string = "slaname";
		public gnext_preapplicationenddate: string = "gnext_preapplicationenddate";
		public new_motionforreconsiderationx: string = "new_motionforreconsiderationx";
		public resolvebyslastatusname: string = "resolvebyslastatusname";
		public gnext_onholdreasonid: string = "gnext_onholdreasonid";
		public gnext_legaladvisorassigneddate: string = "gnext_legaladvisorassigneddate";
		public gnext_psossnlastfour: string = "gnext_psossnlastfour";
		public gnext_prefixname: string = "gnext_prefixname";
		public new_outreachspecialist: string = "new_outreachspecialist";
		public sentimentvalue: string = "sentimentvalue";
		public gnext_abandonmentnotification3date: string = "gnext_abandonmentnotification3date";
		public new_datebjadirectordeterminationsigned: string = "new_datebjadirectordeterminationsigned";
		public gnext_psocity: string = "gnext_psocity";
		public gnext_dcretirementdisabilityname: string = "gnext_dcretirementdisabilityname";
		public gnext_bypasssrbenefitsspecialistreview: string = "gnext_bypasssrbenefitsspecialistreview";
		public gnext_colorcodename: string = "gnext_colorcodename";
		public gnext_seniorbenefitsspecialistreviewcompletedda: string = "gnext_seniorbenefitsspecialistreviewcompletedda";
		public owneridyominame: string = "owneridyominame";
		public gnext_legalreviewenddate: string = "gnext_legalreviewenddate";
		public activitiescompletename: string = "activitiescompletename";
		public entitlementidname: string = "entitlementidname";
		public mergedname: string = "mergedname";
		public gnext_benefitsawardedname: string = "gnext_benefitsawardedname";
		public gnext_benefitsspecialistsignaturedate: string = "gnext_benefitsspecialistsignaturedate";
		public masterid: string = "masterid";
		public adx_createdbyipaddress: string = "adx_createdbyipaddress";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public gnext_publicsafetyagencyid: string = "gnext_publicsafetyagencyid";
		public gnext_claimnumberassigneddate: string = "gnext_claimnumberassigneddate";
		public adx_publishtoweb: string = "adx_publishtoweb";
		public gnext_bypassclaimantagencyfollowup: string = "gnext_bypassclaimantagencyfollowup";
		public createdby: string = "createdby";
		public gnext_bypasspsobdirectorreviewdate: string = "gnext_bypasspsobdirectorreviewdate";
		public gnext_bypassplcaareview: string = "gnext_bypassplcaareview";
		public gnext_psoemployedatthetime: string = "gnext_psoemployedatthetime";
		public gnext_psobdirectorreviewstartdate: string = "gnext_psobdirectorreviewstartdate";
		public contractservicelevelcodename: string = "contractservicelevelcodename";
		public gnext_psobbenefitsspecialistyominame: string = "gnext_psobbenefitsspecialistyominame";
		public firstresponsesentname: string = "firstresponsesentname";
		public existingcase: string = "existingcase";
		public gnext_grossnegligence: string = "gnext_grossnegligence";
		public gnext_imeselectionstartdate: string = "gnext_imeselectionstartdate";
		public gnext_preabandonmentdrafted: string = "gnext_preabandonmentdrafted";
		public gnext_notification1: string = "gnext_notification1";
		public gnext_signnotificationletters: string = "gnext_signnotificationletters";
		public gnext_notification3: string = "gnext_notification3";
		public new_inactivestatuswave2noticeofintentto: string = "new_inactivestatuswave2noticeofintentto";
		public gnext_applicationstartdate: string = "gnext_applicationstartdate";
		public gnext_bypassocfofaad: string = "gnext_bypassocfofaad";
		public gnext_notificationfinalstartdate: string = "gnext_notificationfinalstartdate";
		public gnext_psolegaladvisoremail: string = "gnext_psolegaladvisoremail";
		public gnext_withdrawalrequestreceived: string = "gnext_withdrawalrequestreceived";
		public gnext_applicationvalidated: string = "gnext_applicationvalidated";
		public new_federalappealpetitionernameofcasedo: string = "new_federalappealpetitionernameofcasedo";
		public gnext_draftdeterminationcompletedname: string = "gnext_draftdeterminationcompletedname";
		public responsiblecontactidyominame: string = "responsiblecontactidyominame";
		public gnext_employeecompensationactname: string = "gnext_employeecompensationactname";
		public gnext_followuprequested: string = "gnext_followuprequested";
		public gnext_draftingecondolencename: string = "gnext_draftingecondolencename";
		public gnext_applicationreviewedtimely: string = "gnext_applicationreviewedtimely";
		public gnext_appealsholdname: string = "gnext_appealsholdname";
		public gnext_ocfofaadenddate: string = "gnext_ocfofaadenddate";
		public new_911column6awardedvcf2fundx: string = "new_911column6awardedvcf2fundx";
		public gnext_srbenefitsspecialistyominame: string = "gnext_srbenefitsspecialistyominame";
		public gnext_psozipcode: string = "gnext_psozipcode";
		public gnext_independentmedicalexaminarid: string = "gnext_independentmedicalexaminarid";
		public gnext_seniorbenefitsspecialistreviewplanneddura: string = "gnext_seniorbenefitsspecialistreviewplanneddura";
		public gnext_aggregatescorecompileddate: string = "gnext_aggregatescorecompileddate";
		public gnext_econdolencesent: string = "gnext_econdolencesent";
		public prioritycodename: string = "prioritycodename";
		public gnext_packagedeterminationnotificationdatecompl: string = "gnext_packagedeterminationnotificationdatecompl";
		public gnext_stopclaimtimers: string = "gnext_stopclaimtimers";
		public new_totalbenefitamount: string = "new_totalbenefitamount";
		public new_dateofinactivestatuswave1outreachlette: string = "new_dateofinactivestatuswave1outreachlette";
		public gnext_notificationplannedduration: string = "gnext_notificationplannedduration";
		public gnext_ocfostartdate: string = "gnext_ocfostartdate";
		public new_typeofclaimdeathordisability: string = "new_typeofclaimdeathordisability";
		public gnext_totaltimeocfo: string = "gnext_totaltimeocfo";
		public gnext_ocfofaadplannedduration: string = "gnext_ocfofaadplannedduration";
		public adx_resolution: string = "adx_resolution";
		public gnext_partbsubmissionstatusname: string = "gnext_partbsubmissionstatusname";
		public gnext_decommitted: string = "gnext_decommitted";
		public gnext_bypassocfofaadname: string = "gnext_bypassocfofaadname";
		public gnext_totaltimesrbenefitsspecreview: string = "gnext_totaltimesrbenefitsspecreview";
		public new_sourceof911cod: string = "new_sourceof911cod";
		public productid: string = "productid";
		public gnext_lastdecommitedyregdate: string = "gnext_lastdecommitedyregdate";
		public gnext_claimantagencyfollowup: string = "gnext_claimantagencyfollowup";
		public gnext_optionsample2name: string = "gnext_optionsample2name";
		public gnext_bypassbenefitsspecialistreview: string = "gnext_bypassbenefitsspecialistreview";
		public modifiedbyexternalpartyname: string = "modifiedbyexternalpartyname";
		public new_congressionalinquiryx: string = "new_congressionalinquiryx";
		public gnext_totaltimeclaimantagencyfollowup: string = "gnext_totaltimeclaimantagencyfollowup";
		public gnext_grossnegligencename: string = "gnext_grossnegligencename";
		public gnext_relatedpsorecordsid: string = "gnext_relatedpsorecordsid";
		public severitycodename: string = "severitycodename";
		public gnext_collaborationname: string = "gnext_collaborationname";
		public gnext_ocfoplannedduration: string = "gnext_ocfoplannedduration";
		public new_psobofficeoutcomeapprovaladenialdorp: string = "new_psobofficeoutcomeapprovaladenialdorp";
		public gnext_applicationassigned: string = "gnext_applicationassigned";
		public adx_supportplan: string = "adx_supportplan";
		public gnext_appealsholddate: string = "gnext_appealsholddate";
		public gnext_inserviceofother: string = "gnext_inserviceofother";
		public msa_partnercontactid: string = "msa_partnercontactid";
		public gnext_activitiescompletedate: string = "gnext_activitiescompletedate";
		public incidentid: string = "incidentid";
		public socialprofileidname: string = "socialprofileidname";
		public new_hearingofficerassigned: string = "new_hearingofficerassigned";
		public gnext_preabandonmentsent: string = "gnext_preabandonmentsent";
		public gnext_customerresourcecenterstartdate: string = "gnext_customerresourcecenterstartdate";
		public contractdetailidname: string = "contractdetailidname";
		public gnext_draftnotificationletters: string = "gnext_draftnotificationletters";
		public new_911column8vcfawardpaymenttodate: string = "new_911column8vcfawardpaymenttodate";
		public gnext_scoringclaimstartdate: string = "gnext_scoringclaimstartdate";
		public gnext_seniorbenefitsspecialistsignaturedate: string = "gnext_seniorbenefitsspecialistsignaturedate";
		public new_remandedclaimx: string = "new_remandedclaimx";
		public gnext_preapplicationplannedduration: string = "gnext_preapplicationplannedduration";
		public gnext_optionsample: string = "gnext_optionsample";
		public gnext_bypasssrbenefitsspecialistreviewdate: string = "gnext_bypasssrbenefitsspecialistreviewdate";
		public gnext_attorneyadvisorreview: string = "gnext_attorneyadvisorreview";
		public productserialnumber: string = "productserialnumber";
		public new_federalappealx: string = "new_federalappealx";
		public customersatisfactioncode: string = "customersatisfactioncode";
		public gnext_benefitentitlement: string = "gnext_benefitentitlement";
		public masteridname: string = "masteridname";
		public gnext_psobportaluseridyominame: string = "gnext_psobportaluseridyominame";
		public gnext_ocfofaadstartdate: string = "gnext_ocfofaadstartdate";
		public gnext_applicationreceived: string = "gnext_applicationreceived";
		public gnext_econdolencesentname: string = "gnext_econdolencesentname";
		public gnext_draftnotificationlettersdate: string = "gnext_draftnotificationlettersdate";
		public productidname: string = "productidname";
		public gnext_independentmedicalexaminaridyominame: string = "gnext_independentmedicalexaminaridyominame";
		public gnext_psobbenefitsspecialistname: string = "gnext_psobbenefitsspecialistname";
		public gnext_applicationstartedflagname: string = "gnext_applicationstartedflagname";
		public gnext_addressconfirmationname: string = "gnext_addressconfirmationname";
		public gnext_seniorbenefitsspecialistreviewcompleted: string = "gnext_seniorbenefitsspecialistreviewcompleted";
		public gnext_withdrawalrequestreceivedname: string = "gnext_withdrawalrequestreceivedname";
		public firstresponsebykpiidname: string = "firstresponsebykpiidname";
		public subjectid: string = "subjectid";
		public gnext_obligation3valuename: string = "gnext_obligation3valuename";
		public gnext_seniorbenefitsspecialistsignature: string = "gnext_seniorbenefitsspecialistsignature";
		public gnext_benefitsspecialistreviewcompletedname: string = "gnext_benefitsspecialistreviewcompletedname";
		public gnext_bypassplcaareviewname: string = "gnext_bypassplcaareviewname";
		public gnext_typeofofficername: string = "gnext_typeofofficername";
		public new_durationofdeterminationprocessindaysfro: string = "new_durationofdeterminationprocessindaysfro";
		public gnext_applicationenddate: string = "gnext_applicationenddate";
		public slainvokedidname: string = "slainvokedidname";
		public customercontacted: string = "customercontacted";
		public gnext_applicationsvalidated: string = "gnext_applicationsvalidated";
		public gnext_nonactivitywarning1name: string = "gnext_nonactivitywarning1name";
		public gnext_applicationlinkedname: string = "gnext_applicationlinkedname";
		public firstresponseslastatus: string = "firstresponseslastatus";
		public new_administrativecloseoutneededforhoappeal: string = "new_administrativecloseoutneededforhoappeal";
		public gnext_draftnotificationlettersname: string = "gnext_draftnotificationlettersname";
		public gnext_psoblegaladvisor: string = "gnext_psoblegaladvisor";
		public gnext_lastpsastatus: string = "gnext_lastpsastatus";
		public new_reasonforbjadirectordenial: string = "new_reasonforbjadirectordenial";
		public contactidyominame: string = "contactidyominame";
		public gnext_bypasspreapplication: string = "gnext_bypasspreapplication";
		public resolvebykpiid: string = "resolvebykpiid";
		public gnext_psocountry: string = "gnext_psocountry";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_legalscoringcompleted: string = "gnext_legalscoringcompleted";
		public gnext_abandonmentnotification1date: string = "gnext_abandonmentnotification1date";
		public gnext_achformvalidated: string = "gnext_achformvalidated";
		public gnext_imepacketcompleteddate: string = "gnext_imepacketcompleteddate";
		public gnext_psolegaladvisorphone: string = "gnext_psolegaladvisorphone";
		public gnext_imereviewedqcdate: string = "gnext_imereviewedqcdate";
		public escalatedon: string = "escalatedon";
		public primarycontactidname: string = "primarycontactidname";
		public createdbyexternalpartyname: string = "createdbyexternalpartyname";
		public gnext_psobdirectorreviewenddate: string = "gnext_psobdirectorreviewenddate";
		public gnext_psobresourceyominame: string = "gnext_psobresourceyominame";
		public new_specificissueforissuecase: string = "new_specificissueforissuecase";
		public gnext_bypasspsobdirectorreview: string = "gnext_bypasspsobdirectorreview";
		public gnext_filingextensionreceived: string = "gnext_filingextensionreceived";
		public gnext_filingextensionreviewed: string = "gnext_filingextensionreviewed";
		public gnext_bypasssrbenefitsspecialistreviewname: string = "gnext_bypasssrbenefitsspecialistreviewname";
		public gnext_totaltimescoring: string = "gnext_totaltimescoring";
		public new_claimscore: string = "new_claimscore";
		public importsequencenumber: string = "importsequencenumber";
		public merged: string = "merged";
		public new_positiontitlespecificorexpanded: string = "new_positiontitlespecificorexpanded";
		public gnext_applicationverifiedflag: string = "gnext_applicationverifiedflag";
		public owneridname: string = "owneridname";
		public new_dayspendingtodate: string = "new_dayspendingtodate";
		public gnext_psostate: string = "gnext_psostate";
		public new_exactdurationofbenefitsspecialistreview: string = "new_exactdurationofbenefitsspecialistreview";
		public gnext_filingextensionresponsesent: string = "gnext_filingextensionresponsesent";
		public createdon: string = "createdon";
		public gnext_psobscoringcompleted: string = "gnext_psobscoringcompleted";
		public msa_partneridname: string = "msa_partneridname";
		public gnext_psobdirectorsignaturedate: string = "gnext_psobdirectorsignaturedate";
		public gnext_draftingcondolencestartdate: string = "gnext_draftingcondolencestartdate";
		public adx_createdbyusername: string = "adx_createdbyusername";
		public gnext_employeecompensationact: string = "gnext_employeecompensationact";
		public new_durationfromdateclaimnumberassignedtod: string = "new_durationfromdateclaimnumberassignedtod";
		public gnext_applicationssubmitted_state: string = "gnext_applicationssubmitted_state";
		public gnext_ocfoenddate: string = "gnext_ocfoenddate";
		public gnext_dateofdeath: string = "gnext_dateofdeath";
		public gnext_psovalidatedstatusname: string = "gnext_psovalidatedstatusname";
		public gnext_benefitsspecialistreviewcompleted: string = "gnext_benefitsspecialistreviewcompleted";
		public lastonholdtime: string = "lastonholdtime";
		public blockedprofile: string = "blockedprofile";
		public resolvebykpiidname: string = "resolvebykpiidname";
		public gnext_bypassocfodate: string = "gnext_bypassocfodate";
		public gnext_intentionaldeath: string = "gnext_intentionaldeath";
		public gnext_notificationstartdate: string = "gnext_notificationstartdate";
		public gnext_timesincecreation: string = "gnext_timesincecreation";
		public gnext_withdrawalacknowledgmentlettersent: string = "gnext_withdrawalacknowledgmentlettersent";
		public entityimage_timestamp: string = "entityimage_timestamp";
		public gnext_dateofinjury: string = "gnext_dateofinjury";
		public new_durationoflegalreviewprocessatpsoboffi: string = "new_durationoflegalreviewprocessatpsoboffi";
		public new_hearingofficerhoappealx: string = "new_hearingofficerhoappealx";
		public gnext_socialsecuritynumber: string = "gnext_socialsecuritynumber";
		public gnext_followuprequesteddate: string = "gnext_followuprequesteddate";
		public gnext_lastname: string = "gnext_lastname";
		public gnext_notificationenddate: string = "gnext_notificationenddate";
		public msa_partnercontactidyominame: string = "msa_partnercontactidyominame";
		public gnext_applicationsvalidated_state: string = "gnext_applicationsvalidated_state";
		public customeridname: string = "customeridname";
		public gnext_sendnotificationlettersname: string = "gnext_sendnotificationlettersname";
		public gnext_accessingclaimdatecompleted: string = "gnext_accessingclaimdatecompleted";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public gnext_lastchildentityupdateddate: string = "gnext_lastchildentityupdateddate";
		public new_hearingdate: string = "new_hearingdate";
		public gnext_firstname: string = "gnext_firstname";
		public ownerid: string = "ownerid";
		public followuptaskcreated: string = "followuptaskcreated";
		public gnext_applicationsubmittedflagname: string = "gnext_applicationsubmittedflagname";
		public gnext_inserviceof: string = "gnext_inserviceof";
		public new_911column3awardedvcf1benefitx: string = "new_911column3awardedvcf1benefitx";
		public gnext_officernamesuffix: string = "gnext_officernamesuffix";
		public gnext_totalactualstagedurations: string = "gnext_totalactualstagedurations";
		public new_datacontrolnumberdcnyregdocnumber: string = "new_datacontrolnumberdcnyregdocnumber";
		public billedserviceunits: string = "billedserviceunits";
		public versionnumber: string = "versionnumber";
		public gnext_seniorbenefitsspecialistreviewenddate: string = "gnext_seniorbenefitsspecialistreviewenddate";
		public gnext_applicationsunsubmitted: string = "gnext_applicationsunsubmitted";
		public gnext_addressconfirmationdate: string = "gnext_addressconfirmationdate";
		public gnext_reviewnotificationletters: string = "gnext_reviewnotificationletters";
		public new_assignedlegaladvisorla: string = "new_assignedlegaladvisorla";
		public actualserviceunits: string = "actualserviceunits";
		public gnext_srbenefitsspecialist: string = "gnext_srbenefitsspecialist";
		public gnext_lastpsastatusname: string = "gnext_lastpsastatusname";
		public gnext_applicationsubmittedflag: string = "gnext_applicationsubmittedflag";
		public messagetypecode: string = "messagetypecode";
		public gnext_psorecordonspecialholdname: string = "gnext_psorecordonspecialholdname";
		public gnext_precommitment: string = "gnext_precommitment";
		public gnext_decommittedname: string = "gnext_decommittedname";
		public exchangerate: string = "exchangerate";
		public gnext_benefitsawarded: string = "gnext_benefitsawarded";
		public gnext_dcretirementdisability: string = "gnext_dcretirementdisability";
		public gnext_plcaasignaturename: string = "gnext_plcaasignaturename";
		public followupby: string = "followupby";
		public gnext_internalclosurestatus: string = "gnext_internalclosurestatus";
		public accountidyominame: string = "accountidyominame";
		public gnext_collaborationdate: string = "gnext_collaborationdate";
		public gnext_draftdeterminationcompleteddate: string = "gnext_draftdeterminationcompleteddate";
		public gnext_applicationsunsubmitted_date: string = "gnext_applicationsunsubmitted_date";
		public gnext_stopclaimtimersname: string = "gnext_stopclaimtimersname";
		public gnext_mailingcompletingclaimdatecompleted: string = "gnext_mailingcompletingclaimdatecompleted";
		public gnext_psovalidatedstatus: string = "gnext_psovalidatedstatus";
		public createdbyyominame: string = "createdbyyominame";
		public new_dateofincidentdeathordisability: string = "new_dateofincidentdeathordisability";
		public gnext_applicationsvalidated_date: string = "gnext_applicationsvalidated_date";
		public gnext_bypassocfoname: string = "gnext_bypassocfoname";
		public gnext_psorecordonhold: string = "gnext_psorecordonhold";
		public new_bjadirectorappealoutcomeadorpending: string = "new_bjadirectorappealoutcomeadorpending";
		public gnext_psobresourcecenter2name: string = "gnext_psobresourcecenter2name";
		public gnext_totaltimeplcaareview: string = "gnext_totaltimeplcaareview";
		public gnext_followupreceived: string = "gnext_followupreceived";
		public new_durationofoutreachindaysfromoutreachas: string = "new_durationofoutreachindaysfromoutreachas";
		public gnext_applicationpartb_date: string = "gnext_applicationpartb_date";
		public gnext_performinglegalreviewdatecompleted: string = "gnext_performinglegalreviewdatecompleted";
		public adx_modifiedbyipaddress: string = "adx_modifiedbyipaddress";
		public gnext_filingextensionresponsesentname: string = "gnext_filingextensionresponsesentname";
		public gnext_sendnotificationletters: string = "gnext_sendnotificationletters";
		public accountid: string = "accountid";
		public gnext_plcaasignature: string = "gnext_plcaasignature";
		public kbarticleidname: string = "kbarticleidname";
		public gnext_draftingecondolencedate: string = "gnext_draftingecondolencedate";
		public gnext_precommitmentdate: string = "gnext_precommitmentdate";
		public gnext_imepacketsentdate: string = "gnext_imepacketsentdate";
		public gnext_totaltimelegalreview: string = "gnext_totaltimelegalreview";
		public gnext_totaltimeapplication: string = "gnext_totaltimeapplication";
		public gnext_publicsafetyagencyidname: string = "gnext_publicsafetyagencyidname";
		public gnext_abandonmentletterrevieweddate: string = "gnext_abandonmentletterrevieweddate";
		public gnext_srbenefitsspecialistname: string = "gnext_srbenefitsspecialistname";
		public slainvokedid: string = "slainvokedid";
		public accountidname: string = "accountidname";
		public gnext_legaladvisorreview: string = "gnext_legaladvisorreview";
		public gnext_dateofbirth: string = "gnext_dateofbirth";
		public gnext_psorecordnumberassigneddate: string = "gnext_psorecordnumberassigneddate";
		public gnext_totaltimeocfofaad: string = "gnext_totaltimeocfofaad";
		public new_911column2relatedpsoeaclaims: string = "new_911column2relatedpsoeaclaims";
		public new_causeofdeathcod: string = "new_causeofdeathcod";
		public gnext_nulldatefield: string = "gnext_nulldatefield";
		public gnext_psobresourcename: string = "gnext_psobresourcename";
		public gnext_optionsamplename: string = "gnext_optionsamplename";
		public gnext_notificationfinalenddate: string = "gnext_notificationfinalenddate";
		public gnext_legalreviewplannedduration: string = "gnext_legalreviewplannedduration";
		public gnext_prefix: string = "gnext_prefix";
		public primarycontactid: string = "primarycontactid";
		public gnext_reviewnotificationlettersname: string = "gnext_reviewnotificationlettersname";
		public new_agency: string = "new_agency";
		public gnext_draftingdeterminationdatecompleted: string = "gnext_draftingdeterminationdatecompleted";
		public adx_supportplanname: string = "adx_supportplanname";
		public gnext_applicationssubmitted_date: string = "gnext_applicationssubmitted_date";
		public new_psobofficedeterminationx: string = "new_psobofficedeterminationx";
		public gnext_factualcomplexity: string = "gnext_factualcomplexity";
		public gnext_commitment: string = "gnext_commitment";
		public gnext_plcaasignaturedate: string = "gnext_plcaasignaturedate";
		public gnext_abandonmentletterdrafteddate: string = "gnext_abandonmentletterdrafteddate";
		public customeridyominame: string = "customeridyominame";
		public gnext_claimassessmentplannedduration: string = "gnext_claimassessmentplannedduration";
		public firstresponsesent: string = "firstresponsesent";
		public createdbyexternalparty: string = "createdbyexternalparty";
		public gnext_buildingapplicationstartdate: string = "gnext_buildingapplicationstartdate";
		public statuscode: string = "statuscode";
		public gnext_performinglegalreviewstartdate: string = "gnext_performinglegalreviewstartdate";
		public gnext_seniorbenefitsspecialistreviewstartdate: string = "gnext_seniorbenefitsspecialistreviewstartdate";
		public gnext_imereceiveddate: string = "gnext_imereceiveddate";
		public entityimage_url: string = "entityimage_url";
		public gnext_psoaddress3: string = "gnext_psoaddress3";
		public adx_resolutiondate: string = "adx_resolutiondate";
		public createdbyname: string = "createdbyname";
		public contractdetailid: string = "contractdetailid";
		public subjectidname: string = "subjectidname";
		public new_durationofhearingofficerappealprocessin: string = "new_durationofhearingofficerappealprocessin";
		public gnext_imepacketpreparationstartdate: string = "gnext_imepacketpreparationstartdate";
		public new_issuecasesclaimsonholdbefore52013tra: string = "new_issuecasesclaimsonholdbefore52013tra";
		public gnext_currentdatetime: string = "gnext_currentdatetime";
		public firstresponseslastatusname: string = "firstresponseslastatusname";
		public routecase: string = "routecase";
		public gnext_commitment3valuename: string = "gnext_commitment3valuename";
		public gnext_socialsecuritynumberprefix: string = "gnext_socialsecuritynumberprefix";
		public gnext_withdrawalacknowledgmentlettersentname: string = "gnext_withdrawalacknowledgmentlettersentname";
		public adx_supportrequestname: string = "adx_supportrequestname";
		public gnext_totaltimenotification: string = "gnext_totaltimenotification";
		public gnext_followupreceiveddate: string = "gnext_followupreceiveddate";
		public gnext_psobbenefitsspecialist: string = "gnext_psobbenefitsspecialist";
		public gnext_notificationfinalplannedduration: string = "gnext_notificationfinalplannedduration";
		public gnext_legaladvisorreviewname: string = "gnext_legaladvisorreviewname";
		public gnext_paymentmade: string = "gnext_paymentmade";
		public gnext_reviewingapplicationdatecompleted: string = "gnext_reviewingapplicationdatecompleted";
		public gnext_scoringclaimdatecompleted: string = "gnext_scoringclaimdatecompleted";
		public gnext_relatedpsorecordsidname: string = "gnext_relatedpsorecordsidname";
		public new_reasonforhodenial: string = "new_reasonforhodenial";
		public gnext_markcaseasclosed: string = "gnext_markcaseasclosed";
		public gnext_psoemployedatthetimename: string = "gnext_psoemployedatthetimename";
		public primarycontactidyominame: string = "primarycontactidyominame";
		public gnext_psobresource: string = "gnext_psobresource";
		public gnext_achformreceiveddate: string = "gnext_achformreceiveddate";
		public gnext_intentionalmisconductname: string = "gnext_intentionalmisconductname";
		public gnext_psofullname: string = "gnext_psofullname";
		public gnext_lastprocessname: string = "gnext_lastprocessname";
		public gnext_appealshold: string = "gnext_appealshold";
		public gnext_paymentmadedate: string = "gnext_paymentmadedate";
		public gnext_psaapplicationsubmittedname: string = "gnext_psaapplicationsubmittedname";
		public gnext_plcaareviewstartdate: string = "gnext_plcaareviewstartdate";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_psobportaluserid: string = "gnext_psobportaluserid";
		public contractidname: string = "contractidname";
		public checkemailname: string = "checkemailname";
		public gnext_psaapplicationsubmitted: string = "gnext_psaapplicationsubmitted";
		public gnext_colorcode: string = "gnext_colorcode";
		public gnext_preabandonmentreviewedname: string = "gnext_preabandonmentreviewedname";
		public gnext_psobdirectorsignature: string = "gnext_psobdirectorsignature";
		public gnext_legaladvisorreviewdate: string = "gnext_legaladvisorreviewdate";
		public gnext_draftingecondolence: string = "gnext_draftingecondolence";
		public entityimageid: string = "entityimageid";
		public gnext_psorecordonholdname: string = "gnext_psorecordonholdname";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public gnext_imereceiptstartdate: string = "gnext_imereceiptstartdate";
		public gnext_plcaareviewenddate: string = "gnext_plcaareviewenddate";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public gnext_imereceiptdatecompleted: string = "gnext_imereceiptdatecompleted";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public modifiedbyname: string = "modifiedbyname";
		public gnext_paymentmadename: string = "gnext_paymentmadename";
		public transactioncurrencyid: string = "transactioncurrencyid";
		public customersatisfactioncodename: string = "customersatisfactioncodename";
		public statecode: string = "statecode";
		public gnext_seniorbenefitsspecialistsignaturename: string = "gnext_seniorbenefitsspecialistsignaturename";
		public new_datehodeterminationsigned: string = "new_datehodeterminationsigned";
		public gnext_efficiency: string = "gnext_efficiency";
		public adx_modifiedbyusername: string = "adx_modifiedbyusername";
		public isescalatedname: string = "isescalatedname";
		public new_dateofnoticeofhoappeal: string = "new_dateofnoticeofhoappeal";
		public entitlementid: string = "entitlementid";
		public parentcaseid: string = "parentcaseid";
		public gnext_notification2: string = "gnext_notification2";
		public gnext_applicationpartblookup: string = "gnext_applicationpartblookup";
		public gnext_publicsafetyagencyidyominame: string = "gnext_publicsafetyagencyidyominame";
		public new_bjadirectorappealx: string = "new_bjadirectorappealx";
		public gnext_applicationplannedduration: string = "gnext_applicationplannedduration";
		public gnext_applicationpartb: string = "gnext_applicationpartb";
		public gnext_activeyregnumber: string = "gnext_activeyregnumber";
		public gnext_achformvalidateddate: string = "gnext_achformvalidateddate";
		public new_specificcauseofdeathfromdeathcertificat: string = "new_specificcauseofdeathfromdeathcertificat";
		public gnext_followuprequestedname: string = "gnext_followuprequestedname";
		public gnext_reviewnotificationlettersdate: string = "gnext_reviewnotificationlettersdate";
		public gnext_bypassnotificationname: string = "gnext_bypassnotificationname";
		public gnext_applicationreceivedname: string = "gnext_applicationreceivedname";
		public isdecrementingname: string = "isdecrementingname";
		public gnext_intentionaldeathname: string = "gnext_intentionaldeathname";
		public gnext_bypassapplicationname: string = "gnext_bypassapplicationname";
		public servicestagename: string = "servicestagename";
		public gnext_totaltimepsobdirectorreview: string = "gnext_totaltimepsobdirectorreview";
		public followuptaskcreatedname: string = "followuptaskcreatedname";
		public gnext_buildingapplicationdatecompleted: string = "gnext_buildingapplicationdatecompleted";
		public gnext_noticeofobligationtoocfoname: string = "gnext_noticeofobligationtoocfoname";
		public gnext_bypassplcaareviewdate: string = "gnext_bypassplcaareviewdate";
		public new_datesenttobudget: string = "new_datesenttobudget";
		public new_durationofentireclaimsprocessindaysfro: string = "new_durationofentireclaimsprocessindaysfro";
		public gnext_legalreviewstartdate: string = "gnext_legalreviewstartdate";
		public isdecrementing: string = "isdecrementing";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public new_durationofbenefitsspecialistreviewinday: string = "new_durationofbenefitsspecialistreviewinday";
		public adx_supportrequest: string = "adx_supportrequest";
		public processid: string = "processid";
		public gnext_psobdirectorreview: string = "gnext_psobdirectorreview";
		public gnext_preabandonmentreviewed: string = "gnext_preabandonmentreviewed";
		public gnext_precommitmentname: string = "gnext_precommitmentname";
		public gnext_preabandonmentdraftedname: string = "gnext_preabandonmentdraftedname";
		public gnext_imeselectiondatecompleted: string = "gnext_imeselectiondatecompleted";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public description: string = "description";
		public gnext_benefitsspecialistassigned: string = "gnext_benefitsspecialistassigned";
		public gnext_noticeofobligationtoocfodate: string = "gnext_noticeofobligationtoocfodate";
		public gnext_typeofofficer: string = "gnext_typeofofficer";
		public gnext_claimclassificationstartdate: string = "gnext_claimclassificationstartdate";
		public gnext_independentmedicalexaminaridname: string = "gnext_independentmedicalexaminaridname";
		public gnext_causeofdeath: string = "gnext_causeofdeath";
		public new_inactivestatuswave1outreachletterx: string = "new_inactivestatuswave1outreachletterx";
		public gnext_internalclaimstage: string = "gnext_internalclaimstage";
		public gnext_attorneyadvisorreviewdate: string = "gnext_attorneyadvisorreviewdate";
		public gnext_bypassscoringname: string = "gnext_bypassscoringname";
		public gnext_applicationpartb_state: string = "gnext_applicationpartb_state";
		public gnext_applicationpartblookupname: string = "gnext_applicationpartblookupname";
		public gnext_draftingdeterminationstartdate: string = "gnext_draftingdeterminationstartdate";
		public gnext_draftdeterminationcompleted: string = "gnext_draftdeterminationcompleted";
		public statecodename: string = "statecodename";
		public gnext_claimclassificationplannedduration: string = "gnext_claimclassificationplannedduration";
		public gnext_legaladvisorassigned: string = "gnext_legaladvisorassigned";
		public gnext_ocfo: string = "gnext_ocfo";
		public decremententitlementtermname: string = "decremententitlementtermname";
		public socialprofileid: string = "socialprofileid";
		public firstresponsebykpiid: string = "firstresponsebykpiid";
		public gnext_applicationlinked: string = "gnext_applicationlinked";
		public gnext_officerstitle: string = "gnext_officerstitle";
		public gnext_aggregatescorecompiled: string = "gnext_aggregatescorecompiled";
		public gnext_totaldaysclaimopen: string = "gnext_totaldaysclaimopen";
		public gnext_sendnotificationlettersdate: string = "gnext_sendnotificationlettersdate";
		public gnext_intentionalmisconduct: string = "gnext_intentionalmisconduct";
		public gnext_legalscoringcompletedname: string = "gnext_legalscoringcompletedname";
		public gnext_filingextensionreviewedname: string = "gnext_filingextensionreviewedname";
		public gnext_voluntaryintoxicationname: string = "gnext_voluntaryintoxicationname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public resolveby: string = "resolveby";
		public gnext_middlename: string = "gnext_middlename";
		public gnext_applicationreviewedtimelyname: string = "gnext_applicationreviewedtimelyname";
		public gnext_abandonmentlettersentdate: string = "gnext_abandonmentlettersentdate";
		public gnext_benefitentitlementexplanation: string = "gnext_benefitentitlementexplanation";
		public gnext_achformvalidatedname: string = "gnext_achformvalidatedname";
		public owningteam: string = "owningteam";
		public messagetypecodename: string = "messagetypecodename";
		public caseorigincode: string = "caseorigincode";
		public gnext_bypasspreapplcationdate: string = "gnext_bypasspreapplcationdate";
		public gnext_psobdirectorsignaturename: string = "gnext_psobdirectorsignaturename";
		public gnext_claimassessmentstartdate: string = "gnext_claimassessmentstartdate";
		public adx_publishtowebname: string = "adx_publishtowebname";
		public new_hometownheroeshhdlax: string = "new_hometownheroeshhdlax";
		public gnext_bypasscustomerrescourcespecialistreviewda: string = "gnext_bypasscustomerrescourcespecialistreviewda";
		public casetypecode: string = "casetypecode";
		public traversedpath: string = "traversedpath";
		public contactid: string = "contactid";
		public new_claimantsattorneyrepresentative: string = "new_claimantsattorneyrepresentative";
		public contractservicelevelcode: string = "contractservicelevelcode";
		public createdonbehalfby: string = "createdonbehalfby";
		public new_dateofoutreachassignment: string = "new_dateofoutreachassignment";
		public gnext_claimassessmentenddate: string = "gnext_claimassessmentenddate";
		public gnext_finalizingdeterminationstartdate: string = "gnext_finalizingdeterminationstartdate";
		public gnext_voluntaryintoxication: string = "gnext_voluntaryintoxication";
		public gnext_benefitsspecialistassignedname: string = "gnext_benefitsspecialistassignedname";
		public gnext_preapplicationtotaltime: string = "gnext_preapplicationtotaltime";
		public gnext_psobportaluseridname: string = "gnext_psobportaluseridname";
		public gnext_claimsummaryformcompleted: string = "gnext_claimsummaryformcompleted";
		public gnext_psobdirectorreviewname: string = "gnext_psobdirectorreviewname";
		public customerid: string = "customerid";
		public isescalated: string = "isescalated";
		public gnext_followupreceivedname: string = "gnext_followupreceivedname";
		public contractid: string = "contractid";
		public modifiedby: string = "modifiedby";
		public new_reasonforpsobdenial: string = "new_reasonforpsobdenial";
		public msa_partnercontactidname: string = "msa_partnercontactidname";
		public gnext_applicationssubmitted: string = "gnext_applicationssubmitted";
		public resolvebyslastatus: string = "resolvebyslastatus";
		public gnext_psostateidname: string = "gnext_psostateidname";
		public gnext_benefitsspecialistsignaturename: string = "gnext_benefitsspecialistsignaturename";
		public gnext_psobdirectorreviewplannedduration: string = "gnext_psobdirectorreviewplannedduration";
		public gnext_claimclassificationenddate: string = "gnext_claimclassificationenddate";
		public gnext_achformreceived: string = "gnext_achformreceived";
		public gnext_employmentstatus: string = "gnext_employmentstatus";
		public gnext_accessingclaimstartdate: string = "gnext_accessingclaimstartdate";
		public gnext_totaltimebenefitsspecialistreview: string = "gnext_totaltimebenefitsspecialistreview";
		public gnext_imerequestsentdate: string = "gnext_imerequestsentdate";
		public kbarticleid: string = "kbarticleid";
		public new_administrativecloseoutneeded: string = "new_administrativecloseoutneeded";
		public severitycode: string = "severitycode";
		public gnext_customerresourcecenterplannedduration: string = "gnext_customerresourcecenterplannedduration";
		public decremententitlementterm: string = "decremententitlementterm";
		public gnext_seniorbenefitsspecialistreviewcompletedname: string = "gnext_seniorbenefitsspecialistreviewcompletedname";
		public new_dateofnoticeofintenttodeemclaimabando: string = "new_dateofnoticeofintenttodeemclaimabando";
		public new_durationofbjadirectorappealprocessinda: string = "new_durationofbjadirectorappealprocessinda";
		public gnext_psostatename: string = "gnext_psostatename";
		public gnext_activeyregnumbername: string = "gnext_activeyregnumbername";
		public gnext_psotitle: string = "gnext_psotitle";
		public createdbyexternalpartyyominame: string = "createdbyexternalpartyyominame";
		public onholdtime: string = "onholdtime";
		public msa_partneridyominame: string = "msa_partneridyominame";
		public gnext_bypassbenefitsspecialistreviewdate: string = "gnext_bypassbenefitsspecialistreviewdate";
		public gnext_causeofdeathname: string = "gnext_causeofdeathname";
		public ticketnumber: string = "ticketnumber";
		public entityimage: string = "entityimage";
		public gnext_commitmentname: string = "gnext_commitmentname";
		public gnext_psobresourcecenter2: string = "gnext_psobresourcecenter2";
		public influencescore: string = "influencescore";
		public gnext_bypassocfofaaddate: string = "gnext_bypassocfofaaddate";
		public overriddencreatedon: string = "overriddencreatedon";
		
	}
    /** @description Web API attribute string helper class for Incident
     */ 
    export class IncidentWebAPI {
        public gnext_legalcomplexity: string = "gnext_legalcomplexity";
		public gnext_legalscoringcompleteddate: string = "gnext_legalscoringcompleteddate";
		public new_benefitsparalegalspecialist: string = "new_benefitsparalegalspecialist";
		public gnext_draftingcondolencedatecompleted: string = "gnext_draftingcondolencedatecompleted";
		public gnext_applicationsunsubmitted_state: string = "gnext_applicationsunsubmitted_state";
		public new_911column7vcf2awardtotal: string = "new_911column7vcf2awardtotal";
		public gnext_applicationstartedflag: string = "gnext_applicationstartedflag";
		public gnext_markcaseasclosedname: string = "gnext_markcaseasclosedname";
		public new_generaljobclassificationleffetc: string = "new_generaljobclassificationleffetc";
		public gnext_totaldaysopen: string = "gnext_totaldaysopen";
		public gnext_totaltimecustomerresourcecenter: string = "gnext_totaltimecustomerresourcecenter";
		public gnext_bypassnotification: string = "gnext_bypassnotification";
		public gnext_psoagency: string = "gnext_psoagency";
		public gnext_totaltimenotificationfinal: string = "gnext_totaltimenotificationfinal";
		public _gnext_psostateid_value: string = "_gnext_psostateid_value";
		public numberofchildincidents: string = "numberofchildincidents";
		public gnext_typeofofficerother: string = "gnext_typeofofficerother";
		public gnext_signnotificationlettersdate: string = "gnext_signnotificationlettersdate";
		public gnext_bypassbenefitsspecialistreviewname: string = "gnext_bypassbenefitsspecialistreviewname";
		public gnext_benefitsspecialistsignature: string = "gnext_benefitsspecialistsignature";
		public new_911claimx: string = "new_911claimx";
		public gnext_psoblegaladvisoryominame: string = "gnext_psoblegaladvisoryominame";
		public gnext_finalizingdeterminationdatecompleted: string = "gnext_finalizingdeterminationdatecompleted";
		public gnext_abandonmentnotification2date: string = "gnext_abandonmentnotification2date";
		public new_notes: string = "new_notes";
		public gnext_employmentstatusname: string = "gnext_employmentstatusname";
		public gnext_bypasspreapplicationname: string = "gnext_bypasspreapplicationname";
		public gnext_econdolencesentdate: string = "gnext_econdolencesentdate";
		public adx_stepstoreproduce: string = "adx_stepstoreproduce";
		public gnext_bypassapplication: string = "gnext_bypassapplication";
		public gnext_commitment3value: string = "gnext_commitment3value";
		public _slaid_value: string = "_slaid_value";
		public gnext_reviewingapplicationstartdate: string = "gnext_reviewingapplicationstartdate";
		public casetypecodename: string = "casetypecodename";
		public gnext_claimnumberassigned: string = "gnext_claimnumberassigned";
		public gnext_preabandonmentsentname: string = "gnext_preabandonmentsentname";
		public new_federalappealdecisionadorpending: string = "new_federalappealdecisionadorpending";
		public gnext_bjadirectordeemedabandoneddate: string = "gnext_bjadirectordeemedabandoneddate";
		public gnext_preapplicationstartdate: string = "gnext_preapplicationstartdate";
		public gnext_bypasscustomerresourcecenterreview: string = "gnext_bypasscustomerresourcecenterreview";
		public gnext_signnotificationlettersname: string = "gnext_signnotificationlettersname";
		public gnext_estimatedcompletiondate: string = "gnext_estimatedcompletiondate";
		public new_datebenefitsspecialistassigned: string = "new_datebenefitsspecialistassigned";
		public gnext_nonactivitywarning1: string = "gnext_nonactivitywarning1";
		public gnext_applicationverifiedflagname: string = "gnext_applicationverifiedflagname";
		public responsiblecontactidname: string = "responsiblecontactidname";
		public gnext_legaladvisorassignedname: string = "gnext_legaladvisorassignedname";
		public gnext_internalclosurestatusname: string = "gnext_internalclosurestatusname";
		public gnext_lastddstagename: string = "gnext_lastddstagename";
		public parentcaseidname: string = "parentcaseidname";
		public gnext_bypasslegaladvisorreview: string = "gnext_bypasslegaladvisorreview";
		public gnext_addressconfirmation: string = "gnext_addressconfirmation";
		public gnext_mailingcompletingclaimstartdate: string = "gnext_mailingcompletingclaimstartdate";
		public statuscodename: string = "statuscodename";
		public gnext_bypassclaimantagencyfollowupname: string = "gnext_bypassclaimantagencyfollowupname";
		public gnext_crcspecialistreviewcompleteddate: string = "gnext_crcspecialistreviewcompleteddate";
		public gnext_plcaareviewplannedduration: string = "gnext_plcaareviewplannedduration";
		public _stageid_value: string = "_stageid_value";
		public gnext_bypasspsobdirectorreviewname: string = "gnext_bypasspsobdirectorreviewname";
		public gnext_bypasscustomerresourcecenterreviewname: string = "gnext_bypasscustomerresourcecenterreviewname";
		public gnext_onholdreasonidname: string = "gnext_onholdreasonidname";
		public gnext_psoblegaladvisorname: string = "gnext_psoblegaladvisorname";
		public gnext_claimantagencyfollowupdatestartdate: string = "gnext_claimantagencyfollowupdatestartdate";
		public gnext_lastimestagename: string = "gnext_lastimestagename";
		public gnext_bypassnotificationdate: string = "gnext_bypassnotificationdate";
		public gnext_psobresourcecenter2yominame: string = "gnext_psobresourcecenter2yominame";
		public gnext_aggregatescore: string = "gnext_aggregatescore";
		public gnext_claimantagencyfollowupdateenddate: string = "gnext_claimantagencyfollowupdateenddate";
		public prioritycode: string = "prioritycode";
		public gnext_collaboration: string = "gnext_collaboration";
		public gnext_imepacketpreparationdatecompleted: string = "gnext_imepacketpreparationdatecompleted";
		public gnext_psobscoringcompletedname: string = "gnext_psobscoringcompletedname";
		public gnext_precommitment3valuename: string = "gnext_precommitment3valuename";
		public gnext_psorecordonspecialhold: string = "gnext_psorecordonspecialhold";
		public new_dateofoutreachcompletion: string = "new_dateofoutreachcompletion";
		public new_dateofnoticeofbjadirectorappeal: string = "new_dateofnoticeofbjadirectorappeal";
		public gnext_obligation3value: string = "gnext_obligation3value";
		public gnext_applicationvalidatedname: string = "gnext_applicationvalidatedname";
		public incidentstagecodename: string = "incidentstagecodename";
		public modifiedbyexternalparty: string = "modifiedbyexternalparty";
		public new_911column5registeredforvcf2fundx: string = "new_911column5registeredforvcf2fundx";
		public gnext_precommitment3value: string = "gnext_precommitment3value";
		public owneridtype: string = "owneridtype";
		public gnext_psobdirectorreviewdate: string = "gnext_psobdirectorreviewdate";
		public gnext_preadoptionanticipated: string = "gnext_preadoptionanticipated";
		public gnext_claimsummaryformcompleteddate: string = "gnext_claimsummaryformcompleteddate";
		public _msa_partnerid_value: string = "_msa_partnerid_value";
		public gnext_totalplannedstagedurations: string = "gnext_totalplannedstagedurations";
		public checkemail: string = "checkemail";
		public new_hoappealoutcomeadorpending: string = "new_hoappealoutcomeadorpending";
		public gnext_describeotherprefix: string = "gnext_describeotherprefix";
		public gnext_partbsubmissionstatus: string = "gnext_partbsubmissionstatus";
		public gnext_benefitsspecialistassigneddate: string = "gnext_benefitsspecialistassigneddate";
		public new_includedinvcfchartx: string = "new_includedinvcfchartx";
		public modifiedon: string = "modifiedon";
		public contactidname: string = "contactidname";
		public title: string = "title";
		public gnext_aggregatescorecompiledname: string = "gnext_aggregatescorecompiledname";
		public gnext_attorneyadvisorreviewname: string = "gnext_attorneyadvisorreviewname";
		public gnext_bypassscoringdate: string = "gnext_bypassscoringdate";
		public gnext_bypassapplicationdate: string = "gnext_bypassapplicationdate";
		public _responsiblecontactid_value: string = "_responsiblecontactid_value";
		public gnext_filingextensionreceivedname: string = "gnext_filingextensionreceivedname";
		public gnext_achformreceivedname: string = "gnext_achformreceivedname";
		public gnext_bypasslegaladvisorreviewname: string = "gnext_bypasslegaladvisorreviewname";
		public owninguser: string = "owninguser";
		public gnext_bypassocfo: string = "gnext_bypassocfo";
		public gnext_benefitentitlementname: string = "gnext_benefitentitlementname";
		public servicestage: string = "servicestage";
		public customeridtype: string = "customeridtype";
		public gnext_benefitsspecialistreviewcompleteddate: string = "gnext_benefitsspecialistreviewcompleteddate";
		public gnext_bypassclaimantagencyfollowupdate: string = "gnext_bypassclaimantagencyfollowupdate";
		public incidentstagecode: string = "incidentstagecode";
		public modifiedbyexternalpartyyominame: string = "modifiedbyexternalpartyyominame";
		public gnext_noticeofobligationtoocfo: string = "gnext_noticeofobligationtoocfo";
		public gnext_commitmentdate: string = "gnext_commitmentdate";
		public responseby: string = "responseby";
		public new_911column1numberofpotentialpsoeabene: string = "new_911column1numberofpotentialpsoeabene";
		public caseorigincodename: string = "caseorigincodename";
		public gnext_optionsample2: string = "gnext_optionsample2";
		public gnext_bypassscoring: string = "gnext_bypassscoring";
		public new_911column4vcf1awardtotal: string = "new_911column4vcf1awardtotal";
		public gnext_customerresourcecenterenddate: string = "gnext_customerresourcecenterenddate";
		public gnext_psobscoringcompleteddate: string = "gnext_psobscoringcompleteddate";
		public new_additionalinfo: string = "new_additionalinfo";
		public activitiescomplete: string = "activitiescomplete";
		public gnext_applicationassignedname: string = "gnext_applicationassignedname";
		public gnext_timesinceclaimcreated: string = "gnext_timesinceclaimcreated";
		public gnext_internalclaimstagename: string = "gnext_internalclaimstagename";
		public gnext_bypasslegaladvisorreviewdate: string = "gnext_bypasslegaladvisorreviewdate";
		public gnext_inserviceofname: string = "gnext_inserviceofname";
		public blockedprofilename: string = "blockedprofilename";
		public gnext_packagedeterminationnotificationstartdate: string = "gnext_packagedeterminationnotificationstartdate";
		public gnext_psoaddress2: string = "gnext_psoaddress2";
		public gnext_claimsummaryformcompletedname: string = "gnext_claimsummaryformcompletedname";
		public gnext_psoaddress1: string = "gnext_psoaddress1";
		public slaname: string = "slaname";
		public gnext_preapplicationenddate: string = "gnext_preapplicationenddate";
		public new_motionforreconsiderationx: string = "new_motionforreconsiderationx";
		public resolvebyslastatusname: string = "resolvebyslastatusname";
		public _gnext_onholdreasonid_value: string = "_gnext_onholdreasonid_value";
		public gnext_legaladvisorassigneddate: string = "gnext_legaladvisorassigneddate";
		public gnext_psossnlastfour: string = "gnext_psossnlastfour";
		public gnext_prefixname: string = "gnext_prefixname";
		public new_outreachspecialist: string = "new_outreachspecialist";
		public sentimentvalue: string = "sentimentvalue";
		public gnext_abandonmentnotification3date: string = "gnext_abandonmentnotification3date";
		public new_datebjadirectordeterminationsigned: string = "new_datebjadirectordeterminationsigned";
		public gnext_psocity: string = "gnext_psocity";
		public gnext_dcretirementdisabilityname: string = "gnext_dcretirementdisabilityname";
		public gnext_bypasssrbenefitsspecialistreview: string = "gnext_bypasssrbenefitsspecialistreview";
		public gnext_colorcodename: string = "gnext_colorcodename";
		public gnext_seniorbenefitsspecialistreviewcompletedda: string = "gnext_seniorbenefitsspecialistreviewcompletedda";
		public owneridyominame: string = "owneridyominame";
		public gnext_legalreviewenddate: string = "gnext_legalreviewenddate";
		public activitiescompletename: string = "activitiescompletename";
		public entitlementidname: string = "entitlementidname";
		public mergedname: string = "mergedname";
		public gnext_benefitsawardedname: string = "gnext_benefitsawardedname";
		public gnext_benefitsspecialistsignaturedate: string = "gnext_benefitsspecialistsignaturedate";
		public _masterid_value: string = "_masterid_value";
		public adx_createdbyipaddress: string = "adx_createdbyipaddress";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public _gnext_publicsafetyagencyid_value: string = "_gnext_publicsafetyagencyid_value";
		public gnext_claimnumberassigneddate: string = "gnext_claimnumberassigneddate";
		public adx_publishtoweb: string = "adx_publishtoweb";
		public gnext_bypassclaimantagencyfollowup: string = "gnext_bypassclaimantagencyfollowup";
		public createdby: string = "createdby";
		public gnext_bypasspsobdirectorreviewdate: string = "gnext_bypasspsobdirectorreviewdate";
		public gnext_bypassplcaareview: string = "gnext_bypassplcaareview";
		public gnext_psoemployedatthetime: string = "gnext_psoemployedatthetime";
		public gnext_psobdirectorreviewstartdate: string = "gnext_psobdirectorreviewstartdate";
		public contractservicelevelcodename: string = "contractservicelevelcodename";
		public gnext_psobbenefitsspecialistyominame: string = "gnext_psobbenefitsspecialistyominame";
		public firstresponsesentname: string = "firstresponsesentname";
		public existingcase: string = "existingcase";
		public gnext_grossnegligence: string = "gnext_grossnegligence";
		public gnext_imeselectionstartdate: string = "gnext_imeselectionstartdate";
		public gnext_preabandonmentdrafted: string = "gnext_preabandonmentdrafted";
		public gnext_notification1: string = "gnext_notification1";
		public gnext_signnotificationletters: string = "gnext_signnotificationletters";
		public gnext_notification3: string = "gnext_notification3";
		public new_inactivestatuswave2noticeofintentto: string = "new_inactivestatuswave2noticeofintentto";
		public gnext_applicationstartdate: string = "gnext_applicationstartdate";
		public gnext_bypassocfofaad: string = "gnext_bypassocfofaad";
		public gnext_notificationfinalstartdate: string = "gnext_notificationfinalstartdate";
		public gnext_psolegaladvisoremail: string = "gnext_psolegaladvisoremail";
		public gnext_withdrawalrequestreceived: string = "gnext_withdrawalrequestreceived";
		public gnext_applicationvalidated: string = "gnext_applicationvalidated";
		public new_federalappealpetitionernameofcasedo: string = "new_federalappealpetitionernameofcasedo";
		public gnext_draftdeterminationcompletedname: string = "gnext_draftdeterminationcompletedname";
		public responsiblecontactidyominame: string = "responsiblecontactidyominame";
		public gnext_employeecompensationactname: string = "gnext_employeecompensationactname";
		public gnext_followuprequested: string = "gnext_followuprequested";
		public gnext_draftingecondolencename: string = "gnext_draftingecondolencename";
		public gnext_applicationreviewedtimely: string = "gnext_applicationreviewedtimely";
		public gnext_appealsholdname: string = "gnext_appealsholdname";
		public gnext_ocfofaadenddate: string = "gnext_ocfofaadenddate";
		public new_911column6awardedvcf2fundx: string = "new_911column6awardedvcf2fundx";
		public gnext_srbenefitsspecialistyominame: string = "gnext_srbenefitsspecialistyominame";
		public gnext_psozipcode: string = "gnext_psozipcode";
		public _gnext_independentmedicalexaminarid_value: string = "_gnext_independentmedicalexaminarid_value";
		public gnext_seniorbenefitsspecialistreviewplanneddura: string = "gnext_seniorbenefitsspecialistreviewplanneddura";
		public gnext_aggregatescorecompileddate: string = "gnext_aggregatescorecompileddate";
		public gnext_econdolencesent: string = "gnext_econdolencesent";
		public prioritycodename: string = "prioritycodename";
		public gnext_packagedeterminationnotificationdatecompl: string = "gnext_packagedeterminationnotificationdatecompl";
		public gnext_stopclaimtimers: string = "gnext_stopclaimtimers";
		public new_totalbenefitamount: string = "new_totalbenefitamount";
		public new_dateofinactivestatuswave1outreachlette: string = "new_dateofinactivestatuswave1outreachlette";
		public gnext_notificationplannedduration: string = "gnext_notificationplannedduration";
		public gnext_ocfostartdate: string = "gnext_ocfostartdate";
		public new_typeofclaimdeathordisability: string = "new_typeofclaimdeathordisability";
		public gnext_totaltimeocfo: string = "gnext_totaltimeocfo";
		public gnext_ocfofaadplannedduration: string = "gnext_ocfofaadplannedduration";
		public adx_resolution: string = "adx_resolution";
		public gnext_partbsubmissionstatusname: string = "gnext_partbsubmissionstatusname";
		public gnext_decommitted: string = "gnext_decommitted";
		public gnext_bypassocfofaadname: string = "gnext_bypassocfofaadname";
		public gnext_totaltimesrbenefitsspecreview: string = "gnext_totaltimesrbenefitsspecreview";
		public new_sourceof911cod: string = "new_sourceof911cod";
		public _productid_value: string = "_productid_value";
		public gnext_lastdecommitedyregdate: string = "gnext_lastdecommitedyregdate";
		public gnext_claimantagencyfollowup: string = "gnext_claimantagencyfollowup";
		public gnext_optionsample2name: string = "gnext_optionsample2name";
		public gnext_bypassbenefitsspecialistreview: string = "gnext_bypassbenefitsspecialistreview";
		public modifiedbyexternalpartyname: string = "modifiedbyexternalpartyname";
		public new_congressionalinquiryx: string = "new_congressionalinquiryx";
		public gnext_totaltimeclaimantagencyfollowup: string = "gnext_totaltimeclaimantagencyfollowup";
		public gnext_grossnegligencename: string = "gnext_grossnegligencename";
		public _gnext_relatedpsorecordsid_value: string = "_gnext_relatedpsorecordsid_value";
		public severitycodename: string = "severitycodename";
		public gnext_collaborationname: string = "gnext_collaborationname";
		public gnext_ocfoplannedduration: string = "gnext_ocfoplannedduration";
		public new_psobofficeoutcomeapprovaladenialdorp: string = "new_psobofficeoutcomeapprovaladenialdorp";
		public gnext_applicationassigned: string = "gnext_applicationassigned";
		public adx_supportplan: string = "adx_supportplan";
		public gnext_appealsholddate: string = "gnext_appealsholddate";
		public gnext_inserviceofother: string = "gnext_inserviceofother";
		public _msa_partnercontactid_value: string = "_msa_partnercontactid_value";
		public gnext_activitiescompletedate: string = "gnext_activitiescompletedate";
		public incidentid: string = "incidentid";
		public socialprofileidname: string = "socialprofileidname";
		public new_hearingofficerassigned: string = "new_hearingofficerassigned";
		public gnext_preabandonmentsent: string = "gnext_preabandonmentsent";
		public gnext_customerresourcecenterstartdate: string = "gnext_customerresourcecenterstartdate";
		public contractdetailidname: string = "contractdetailidname";
		public gnext_draftnotificationletters: string = "gnext_draftnotificationletters";
		public new_911column8vcfawardpaymenttodate: string = "new_911column8vcfawardpaymenttodate";
		public gnext_scoringclaimstartdate: string = "gnext_scoringclaimstartdate";
		public gnext_seniorbenefitsspecialistsignaturedate: string = "gnext_seniorbenefitsspecialistsignaturedate";
		public new_remandedclaimx: string = "new_remandedclaimx";
		public gnext_preapplicationplannedduration: string = "gnext_preapplicationplannedduration";
		public gnext_optionsample: string = "gnext_optionsample";
		public gnext_bypasssrbenefitsspecialistreviewdate: string = "gnext_bypasssrbenefitsspecialistreviewdate";
		public gnext_attorneyadvisorreview: string = "gnext_attorneyadvisorreview";
		public productserialnumber: string = "productserialnumber";
		public new_federalappealx: string = "new_federalappealx";
		public customersatisfactioncode: string = "customersatisfactioncode";
		public gnext_benefitentitlement: string = "gnext_benefitentitlement";
		public masteridname: string = "masteridname";
		public gnext_psobportaluseridyominame: string = "gnext_psobportaluseridyominame";
		public gnext_ocfofaadstartdate: string = "gnext_ocfofaadstartdate";
		public gnext_applicationreceived: string = "gnext_applicationreceived";
		public gnext_econdolencesentname: string = "gnext_econdolencesentname";
		public gnext_draftnotificationlettersdate: string = "gnext_draftnotificationlettersdate";
		public productidname: string = "productidname";
		public gnext_independentmedicalexaminaridyominame: string = "gnext_independentmedicalexaminaridyominame";
		public gnext_psobbenefitsspecialistname: string = "gnext_psobbenefitsspecialistname";
		public gnext_applicationstartedflagname: string = "gnext_applicationstartedflagname";
		public gnext_addressconfirmationname: string = "gnext_addressconfirmationname";
		public gnext_seniorbenefitsspecialistreviewcompleted: string = "gnext_seniorbenefitsspecialistreviewcompleted";
		public gnext_withdrawalrequestreceivedname: string = "gnext_withdrawalrequestreceivedname";
		public firstresponsebykpiidname: string = "firstresponsebykpiidname";
		public _subjectid_value: string = "_subjectid_value";
		public gnext_obligation3valuename: string = "gnext_obligation3valuename";
		public gnext_seniorbenefitsspecialistsignature: string = "gnext_seniorbenefitsspecialistsignature";
		public gnext_benefitsspecialistreviewcompletedname: string = "gnext_benefitsspecialistreviewcompletedname";
		public gnext_bypassplcaareviewname: string = "gnext_bypassplcaareviewname";
		public gnext_typeofofficername: string = "gnext_typeofofficername";
		public new_durationofdeterminationprocessindaysfro: string = "new_durationofdeterminationprocessindaysfro";
		public gnext_applicationenddate: string = "gnext_applicationenddate";
		public slainvokedidname: string = "slainvokedidname";
		public customercontacted: string = "customercontacted";
		public gnext_applicationsvalidated: string = "gnext_applicationsvalidated";
		public gnext_nonactivitywarning1name: string = "gnext_nonactivitywarning1name";
		public gnext_applicationlinkedname: string = "gnext_applicationlinkedname";
		public firstresponseslastatus: string = "firstresponseslastatus";
		public new_administrativecloseoutneededforhoappeal: string = "new_administrativecloseoutneededforhoappeal";
		public gnext_draftnotificationlettersname: string = "gnext_draftnotificationlettersname";
		public gnext_psoblegaladvisor: string = "gnext_psoblegaladvisor";
		public gnext_lastpsastatus: string = "gnext_lastpsastatus";
		public new_reasonforbjadirectordenial: string = "new_reasonforbjadirectordenial";
		public contactidyominame: string = "contactidyominame";
		public gnext_bypasspreapplication: string = "gnext_bypasspreapplication";
		public _resolvebykpiid_value: string = "_resolvebykpiid_value";
		public gnext_psocountry: string = "gnext_psocountry";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_legalscoringcompleted: string = "gnext_legalscoringcompleted";
		public gnext_abandonmentnotification1date: string = "gnext_abandonmentnotification1date";
		public gnext_achformvalidated: string = "gnext_achformvalidated";
		public gnext_imepacketcompleteddate: string = "gnext_imepacketcompleteddate";
		public gnext_psolegaladvisorphone: string = "gnext_psolegaladvisorphone";
		public gnext_imereviewedqcdate: string = "gnext_imereviewedqcdate";
		public escalatedon: string = "escalatedon";
		public primarycontactidname: string = "primarycontactidname";
		public createdbyexternalpartyname: string = "createdbyexternalpartyname";
		public gnext_psobdirectorreviewenddate: string = "gnext_psobdirectorreviewenddate";
		public gnext_psobresourceyominame: string = "gnext_psobresourceyominame";
		public new_specificissueforissuecase: string = "new_specificissueforissuecase";
		public gnext_bypasspsobdirectorreview: string = "gnext_bypasspsobdirectorreview";
		public gnext_filingextensionreceived: string = "gnext_filingextensionreceived";
		public gnext_filingextensionreviewed: string = "gnext_filingextensionreviewed";
		public gnext_bypasssrbenefitsspecialistreviewname: string = "gnext_bypasssrbenefitsspecialistreviewname";
		public gnext_totaltimescoring: string = "gnext_totaltimescoring";
		public new_claimscore: string = "new_claimscore";
		public importsequencenumber: string = "importsequencenumber";
		public merged: string = "merged";
		public new_positiontitlespecificorexpanded: string = "new_positiontitlespecificorexpanded";
		public gnext_applicationverifiedflag: string = "gnext_applicationverifiedflag";
		public owneridname: string = "owneridname";
		public new_dayspendingtodate: string = "new_dayspendingtodate";
		public gnext_psostate: string = "gnext_psostate";
		public new_exactdurationofbenefitsspecialistreview: string = "new_exactdurationofbenefitsspecialistreview";
		public gnext_filingextensionresponsesent: string = "gnext_filingextensionresponsesent";
		public createdon: string = "createdon";
		public gnext_psobscoringcompleted: string = "gnext_psobscoringcompleted";
		public msa_partneridname: string = "msa_partneridname";
		public gnext_psobdirectorsignaturedate: string = "gnext_psobdirectorsignaturedate";
		public gnext_draftingcondolencestartdate: string = "gnext_draftingcondolencestartdate";
		public adx_createdbyusername: string = "adx_createdbyusername";
		public gnext_employeecompensationact: string = "gnext_employeecompensationact";
		public new_durationfromdateclaimnumberassignedtod: string = "new_durationfromdateclaimnumberassignedtod";
		public gnext_applicationssubmitted_state: string = "gnext_applicationssubmitted_state";
		public gnext_ocfoenddate: string = "gnext_ocfoenddate";
		public gnext_dateofdeath: string = "gnext_dateofdeath";
		public gnext_psovalidatedstatusname: string = "gnext_psovalidatedstatusname";
		public gnext_benefitsspecialistreviewcompleted: string = "gnext_benefitsspecialistreviewcompleted";
		public lastonholdtime: string = "lastonholdtime";
		public blockedprofile: string = "blockedprofile";
		public resolvebykpiidname: string = "resolvebykpiidname";
		public gnext_bypassocfodate: string = "gnext_bypassocfodate";
		public gnext_intentionaldeath: string = "gnext_intentionaldeath";
		public gnext_notificationstartdate: string = "gnext_notificationstartdate";
		public gnext_timesincecreation: string = "gnext_timesincecreation";
		public gnext_withdrawalacknowledgmentlettersent: string = "gnext_withdrawalacknowledgmentlettersent";
		public entityimage_timestamp: string = "entityimage_timestamp";
		public gnext_dateofinjury: string = "gnext_dateofinjury";
		public new_durationoflegalreviewprocessatpsoboffi: string = "new_durationoflegalreviewprocessatpsoboffi";
		public new_hearingofficerhoappealx: string = "new_hearingofficerhoappealx";
		public gnext_socialsecuritynumber: string = "gnext_socialsecuritynumber";
		public gnext_followuprequesteddate: string = "gnext_followuprequesteddate";
		public gnext_lastname: string = "gnext_lastname";
		public gnext_notificationenddate: string = "gnext_notificationenddate";
		public msa_partnercontactidyominame: string = "msa_partnercontactidyominame";
		public gnext_applicationsvalidated_state: string = "gnext_applicationsvalidated_state";
		public customeridname: string = "customeridname";
		public gnext_sendnotificationlettersname: string = "gnext_sendnotificationlettersname";
		public gnext_accessingclaimdatecompleted: string = "gnext_accessingclaimdatecompleted";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public gnext_lastchildentityupdateddate: string = "gnext_lastchildentityupdateddate";
		public new_hearingdate: string = "new_hearingdate";
		public gnext_firstname: string = "gnext_firstname";
		public _ownerid_value: string = "_ownerid_value";
		public followuptaskcreated: string = "followuptaskcreated";
		public gnext_applicationsubmittedflagname: string = "gnext_applicationsubmittedflagname";
		public gnext_inserviceof: string = "gnext_inserviceof";
		public new_911column3awardedvcf1benefitx: string = "new_911column3awardedvcf1benefitx";
		public gnext_officernamesuffix: string = "gnext_officernamesuffix";
		public gnext_totalactualstagedurations: string = "gnext_totalactualstagedurations";
		public new_datacontrolnumberdcnyregdocnumber: string = "new_datacontrolnumberdcnyregdocnumber";
		public billedserviceunits: string = "billedserviceunits";
		public versionnumber: string = "versionnumber";
		public gnext_seniorbenefitsspecialistreviewenddate: string = "gnext_seniorbenefitsspecialistreviewenddate";
		public gnext_applicationsunsubmitted: string = "gnext_applicationsunsubmitted";
		public gnext_addressconfirmationdate: string = "gnext_addressconfirmationdate";
		public gnext_reviewnotificationletters: string = "gnext_reviewnotificationletters";
		public new_assignedlegaladvisorla: string = "new_assignedlegaladvisorla";
		public actualserviceunits: string = "actualserviceunits";
		public gnext_srbenefitsspecialist: string = "gnext_srbenefitsspecialist";
		public gnext_lastpsastatusname: string = "gnext_lastpsastatusname";
		public gnext_applicationsubmittedflag: string = "gnext_applicationsubmittedflag";
		public messagetypecode: string = "messagetypecode";
		public gnext_psorecordonspecialholdname: string = "gnext_psorecordonspecialholdname";
		public gnext_precommitment: string = "gnext_precommitment";
		public gnext_decommittedname: string = "gnext_decommittedname";
		public exchangerate: string = "exchangerate";
		public gnext_benefitsawarded: string = "gnext_benefitsawarded";
		public gnext_dcretirementdisability: string = "gnext_dcretirementdisability";
		public gnext_plcaasignaturename: string = "gnext_plcaasignaturename";
		public followupby: string = "followupby";
		public gnext_internalclosurestatus: string = "gnext_internalclosurestatus";
		public accountidyominame: string = "accountidyominame";
		public gnext_collaborationdate: string = "gnext_collaborationdate";
		public gnext_draftdeterminationcompleteddate: string = "gnext_draftdeterminationcompleteddate";
		public gnext_applicationsunsubmitted_date: string = "gnext_applicationsunsubmitted_date";
		public gnext_stopclaimtimersname: string = "gnext_stopclaimtimersname";
		public gnext_mailingcompletingclaimdatecompleted: string = "gnext_mailingcompletingclaimdatecompleted";
		public gnext_psovalidatedstatus: string = "gnext_psovalidatedstatus";
		public createdbyyominame: string = "createdbyyominame";
		public new_dateofincidentdeathordisability: string = "new_dateofincidentdeathordisability";
		public gnext_applicationsvalidated_date: string = "gnext_applicationsvalidated_date";
		public gnext_bypassocfoname: string = "gnext_bypassocfoname";
		public gnext_psorecordonhold: string = "gnext_psorecordonhold";
		public new_bjadirectorappealoutcomeadorpending: string = "new_bjadirectorappealoutcomeadorpending";
		public gnext_psobresourcecenter2name: string = "gnext_psobresourcecenter2name";
		public gnext_totaltimeplcaareview: string = "gnext_totaltimeplcaareview";
		public gnext_followupreceived: string = "gnext_followupreceived";
		public new_durationofoutreachindaysfromoutreachas: string = "new_durationofoutreachindaysfromoutreachas";
		public gnext_applicationpartb_date: string = "gnext_applicationpartb_date";
		public gnext_performinglegalreviewdatecompleted: string = "gnext_performinglegalreviewdatecompleted";
		public adx_modifiedbyipaddress: string = "adx_modifiedbyipaddress";
		public gnext_filingextensionresponsesentname: string = "gnext_filingextensionresponsesentname";
		public gnext_sendnotificationletters: string = "gnext_sendnotificationletters";
		public _accountid_value: string = "_accountid_value";
		public gnext_plcaasignature: string = "gnext_plcaasignature";
		public kbarticleidname: string = "kbarticleidname";
		public gnext_draftingecondolencedate: string = "gnext_draftingecondolencedate";
		public gnext_precommitmentdate: string = "gnext_precommitmentdate";
		public gnext_imepacketsentdate: string = "gnext_imepacketsentdate";
		public gnext_totaltimelegalreview: string = "gnext_totaltimelegalreview";
		public gnext_totaltimeapplication: string = "gnext_totaltimeapplication";
		public gnext_publicsafetyagencyidname: string = "gnext_publicsafetyagencyidname";
		public gnext_abandonmentletterrevieweddate: string = "gnext_abandonmentletterrevieweddate";
		public gnext_srbenefitsspecialistname: string = "gnext_srbenefitsspecialistname";
		public _slainvokedid_value: string = "_slainvokedid_value";
		public accountidname: string = "accountidname";
		public gnext_legaladvisorreview: string = "gnext_legaladvisorreview";
		public gnext_dateofbirth: string = "gnext_dateofbirth";
		public gnext_psorecordnumberassigneddate: string = "gnext_psorecordnumberassigneddate";
		public gnext_totaltimeocfofaad: string = "gnext_totaltimeocfofaad";
		public new_911column2relatedpsoeaclaims: string = "new_911column2relatedpsoeaclaims";
		public new_causeofdeathcod: string = "new_causeofdeathcod";
		public gnext_nulldatefield: string = "gnext_nulldatefield";
		public gnext_psobresourcename: string = "gnext_psobresourcename";
		public gnext_optionsamplename: string = "gnext_optionsamplename";
		public gnext_notificationfinalenddate: string = "gnext_notificationfinalenddate";
		public gnext_legalreviewplannedduration: string = "gnext_legalreviewplannedduration";
		public gnext_prefix: string = "gnext_prefix";
		public _primarycontactid_value: string = "_primarycontactid_value";
		public gnext_reviewnotificationlettersname: string = "gnext_reviewnotificationlettersname";
		public new_agency: string = "new_agency";
		public gnext_draftingdeterminationdatecompleted: string = "gnext_draftingdeterminationdatecompleted";
		public adx_supportplanname: string = "adx_supportplanname";
		public gnext_applicationssubmitted_date: string = "gnext_applicationssubmitted_date";
		public new_psobofficedeterminationx: string = "new_psobofficedeterminationx";
		public gnext_factualcomplexity: string = "gnext_factualcomplexity";
		public gnext_commitment: string = "gnext_commitment";
		public gnext_plcaasignaturedate: string = "gnext_plcaasignaturedate";
		public gnext_abandonmentletterdrafteddate: string = "gnext_abandonmentletterdrafteddate";
		public customeridyominame: string = "customeridyominame";
		public gnext_claimassessmentplannedduration: string = "gnext_claimassessmentplannedduration";
		public firstresponsesent: string = "firstresponsesent";
		public createdbyexternalparty: string = "createdbyexternalparty";
		public gnext_buildingapplicationstartdate: string = "gnext_buildingapplicationstartdate";
		public statuscode: string = "statuscode";
		public gnext_performinglegalreviewstartdate: string = "gnext_performinglegalreviewstartdate";
		public gnext_seniorbenefitsspecialistreviewstartdate: string = "gnext_seniorbenefitsspecialistreviewstartdate";
		public gnext_imereceiveddate: string = "gnext_imereceiveddate";
		public entityimage_url: string = "entityimage_url";
		public gnext_psoaddress3: string = "gnext_psoaddress3";
		public adx_resolutiondate: string = "adx_resolutiondate";
		public createdbyname: string = "createdbyname";
		public _contractdetailid_value: string = "_contractdetailid_value";
		public subjectidname: string = "subjectidname";
		public new_durationofhearingofficerappealprocessin: string = "new_durationofhearingofficerappealprocessin";
		public gnext_imepacketpreparationstartdate: string = "gnext_imepacketpreparationstartdate";
		public new_issuecasesclaimsonholdbefore52013tra: string = "new_issuecasesclaimsonholdbefore52013tra";
		public gnext_currentdatetime: string = "gnext_currentdatetime";
		public firstresponseslastatusname: string = "firstresponseslastatusname";
		public routecase: string = "routecase";
		public gnext_commitment3valuename: string = "gnext_commitment3valuename";
		public gnext_socialsecuritynumberprefix: string = "gnext_socialsecuritynumberprefix";
		public gnext_withdrawalacknowledgmentlettersentname: string = "gnext_withdrawalacknowledgmentlettersentname";
		public adx_supportrequestname: string = "adx_supportrequestname";
		public gnext_totaltimenotification: string = "gnext_totaltimenotification";
		public gnext_followupreceiveddate: string = "gnext_followupreceiveddate";
		public gnext_psobbenefitsspecialist: string = "gnext_psobbenefitsspecialist";
		public gnext_notificationfinalplannedduration: string = "gnext_notificationfinalplannedduration";
		public gnext_legaladvisorreviewname: string = "gnext_legaladvisorreviewname";
		public gnext_paymentmade: string = "gnext_paymentmade";
		public gnext_reviewingapplicationdatecompleted: string = "gnext_reviewingapplicationdatecompleted";
		public gnext_scoringclaimdatecompleted: string = "gnext_scoringclaimdatecompleted";
		public gnext_relatedpsorecordsidname: string = "gnext_relatedpsorecordsidname";
		public new_reasonforhodenial: string = "new_reasonforhodenial";
		public gnext_markcaseasclosed: string = "gnext_markcaseasclosed";
		public gnext_psoemployedatthetimename: string = "gnext_psoemployedatthetimename";
		public primarycontactidyominame: string = "primarycontactidyominame";
		public gnext_psobresource: string = "gnext_psobresource";
		public gnext_achformreceiveddate: string = "gnext_achformreceiveddate";
		public gnext_intentionalmisconductname: string = "gnext_intentionalmisconductname";
		public gnext_psofullname: string = "gnext_psofullname";
		public gnext_lastprocessname: string = "gnext_lastprocessname";
		public gnext_appealshold: string = "gnext_appealshold";
		public gnext_paymentmadedate: string = "gnext_paymentmadedate";
		public gnext_psaapplicationsubmittedname: string = "gnext_psaapplicationsubmittedname";
		public gnext_plcaareviewstartdate: string = "gnext_plcaareviewstartdate";
		public owningbusinessunit: string = "owningbusinessunit";
		public _gnext_psobportaluserid_value: string = "_gnext_psobportaluserid_value";
		public contractidname: string = "contractidname";
		public checkemailname: string = "checkemailname";
		public gnext_psaapplicationsubmitted: string = "gnext_psaapplicationsubmitted";
		public gnext_colorcode: string = "gnext_colorcode";
		public gnext_preabandonmentreviewedname: string = "gnext_preabandonmentreviewedname";
		public gnext_psobdirectorsignature: string = "gnext_psobdirectorsignature";
		public gnext_legaladvisorreviewdate: string = "gnext_legaladvisorreviewdate";
		public gnext_draftingecondolence: string = "gnext_draftingecondolence";
		public _entityimageid_value: string = "_entityimageid_value";
		public gnext_psorecordonholdname: string = "gnext_psorecordonholdname";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public gnext_imereceiptstartdate: string = "gnext_imereceiptstartdate";
		public gnext_plcaareviewenddate: string = "gnext_plcaareviewenddate";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public gnext_imereceiptdatecompleted: string = "gnext_imereceiptdatecompleted";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public modifiedbyname: string = "modifiedbyname";
		public gnext_paymentmadename: string = "gnext_paymentmadename";
		public _transactioncurrencyid_value: string = "_transactioncurrencyid_value";
		public customersatisfactioncodename: string = "customersatisfactioncodename";
		public statecode: string = "statecode";
		public gnext_seniorbenefitsspecialistsignaturename: string = "gnext_seniorbenefitsspecialistsignaturename";
		public new_datehodeterminationsigned: string = "new_datehodeterminationsigned";
		public gnext_efficiency: string = "gnext_efficiency";
		public adx_modifiedbyusername: string = "adx_modifiedbyusername";
		public isescalatedname: string = "isescalatedname";
		public new_dateofnoticeofhoappeal: string = "new_dateofnoticeofhoappeal";
		public _entitlementid_value: string = "_entitlementid_value";
		public _parentcaseid_value: string = "_parentcaseid_value";
		public gnext_notification2: string = "gnext_notification2";
		public gnext_applicationpartblookup: string = "gnext_applicationpartblookup";
		public gnext_publicsafetyagencyidyominame: string = "gnext_publicsafetyagencyidyominame";
		public new_bjadirectorappealx: string = "new_bjadirectorappealx";
		public gnext_applicationplannedduration: string = "gnext_applicationplannedduration";
		public gnext_applicationpartb: string = "gnext_applicationpartb";
		public gnext_activeyregnumber: string = "gnext_activeyregnumber";
		public gnext_achformvalidateddate: string = "gnext_achformvalidateddate";
		public new_specificcauseofdeathfromdeathcertificat: string = "new_specificcauseofdeathfromdeathcertificat";
		public gnext_followuprequestedname: string = "gnext_followuprequestedname";
		public gnext_reviewnotificationlettersdate: string = "gnext_reviewnotificationlettersdate";
		public gnext_bypassnotificationname: string = "gnext_bypassnotificationname";
		public gnext_applicationreceivedname: string = "gnext_applicationreceivedname";
		public isdecrementingname: string = "isdecrementingname";
		public gnext_intentionaldeathname: string = "gnext_intentionaldeathname";
		public gnext_bypassapplicationname: string = "gnext_bypassapplicationname";
		public servicestagename: string = "servicestagename";
		public gnext_totaltimepsobdirectorreview: string = "gnext_totaltimepsobdirectorreview";
		public followuptaskcreatedname: string = "followuptaskcreatedname";
		public gnext_buildingapplicationdatecompleted: string = "gnext_buildingapplicationdatecompleted";
		public gnext_noticeofobligationtoocfoname: string = "gnext_noticeofobligationtoocfoname";
		public gnext_bypassplcaareviewdate: string = "gnext_bypassplcaareviewdate";
		public new_datesenttobudget: string = "new_datesenttobudget";
		public new_durationofentireclaimsprocessindaysfro: string = "new_durationofentireclaimsprocessindaysfro";
		public gnext_legalreviewstartdate: string = "gnext_legalreviewstartdate";
		public isdecrementing: string = "isdecrementing";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public new_durationofbenefitsspecialistreviewinday: string = "new_durationofbenefitsspecialistreviewinday";
		public adx_supportrequest: string = "adx_supportrequest";
		public _processid_value: string = "_processid_value";
		public gnext_psobdirectorreview: string = "gnext_psobdirectorreview";
		public gnext_preabandonmentreviewed: string = "gnext_preabandonmentreviewed";
		public gnext_precommitmentname: string = "gnext_precommitmentname";
		public gnext_preabandonmentdraftedname: string = "gnext_preabandonmentdraftedname";
		public gnext_imeselectiondatecompleted: string = "gnext_imeselectiondatecompleted";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public description: string = "description";
		public gnext_benefitsspecialistassigned: string = "gnext_benefitsspecialistassigned";
		public gnext_noticeofobligationtoocfodate: string = "gnext_noticeofobligationtoocfodate";
		public gnext_typeofofficer: string = "gnext_typeofofficer";
		public gnext_claimclassificationstartdate: string = "gnext_claimclassificationstartdate";
		public gnext_independentmedicalexaminaridname: string = "gnext_independentmedicalexaminaridname";
		public gnext_causeofdeath: string = "gnext_causeofdeath";
		public new_inactivestatuswave1outreachletterx: string = "new_inactivestatuswave1outreachletterx";
		public gnext_internalclaimstage: string = "gnext_internalclaimstage";
		public gnext_attorneyadvisorreviewdate: string = "gnext_attorneyadvisorreviewdate";
		public gnext_bypassscoringname: string = "gnext_bypassscoringname";
		public gnext_applicationpartb_state: string = "gnext_applicationpartb_state";
		public gnext_applicationpartblookupname: string = "gnext_applicationpartblookupname";
		public gnext_draftingdeterminationstartdate: string = "gnext_draftingdeterminationstartdate";
		public gnext_draftdeterminationcompleted: string = "gnext_draftdeterminationcompleted";
		public statecodename: string = "statecodename";
		public gnext_claimclassificationplannedduration: string = "gnext_claimclassificationplannedduration";
		public gnext_legaladvisorassigned: string = "gnext_legaladvisorassigned";
		public gnext_ocfo: string = "gnext_ocfo";
		public decremententitlementtermname: string = "decremententitlementtermname";
		public _socialprofileid_value: string = "_socialprofileid_value";
		public _firstresponsebykpiid_value: string = "_firstresponsebykpiid_value";
		public gnext_applicationlinked: string = "gnext_applicationlinked";
		public gnext_officerstitle: string = "gnext_officerstitle";
		public gnext_aggregatescorecompiled: string = "gnext_aggregatescorecompiled";
		public gnext_totaldaysclaimopen: string = "gnext_totaldaysclaimopen";
		public gnext_sendnotificationlettersdate: string = "gnext_sendnotificationlettersdate";
		public gnext_intentionalmisconduct: string = "gnext_intentionalmisconduct";
		public gnext_legalscoringcompletedname: string = "gnext_legalscoringcompletedname";
		public gnext_filingextensionreviewedname: string = "gnext_filingextensionreviewedname";
		public gnext_voluntaryintoxicationname: string = "gnext_voluntaryintoxicationname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public resolveby: string = "resolveby";
		public gnext_middlename: string = "gnext_middlename";
		public gnext_applicationreviewedtimelyname: string = "gnext_applicationreviewedtimelyname";
		public gnext_abandonmentlettersentdate: string = "gnext_abandonmentlettersentdate";
		public gnext_benefitentitlementexplanation: string = "gnext_benefitentitlementexplanation";
		public gnext_achformvalidatedname: string = "gnext_achformvalidatedname";
		public owningteam: string = "owningteam";
		public messagetypecodename: string = "messagetypecodename";
		public caseorigincode: string = "caseorigincode";
		public gnext_bypasspreapplcationdate: string = "gnext_bypasspreapplcationdate";
		public gnext_psobdirectorsignaturename: string = "gnext_psobdirectorsignaturename";
		public gnext_claimassessmentstartdate: string = "gnext_claimassessmentstartdate";
		public adx_publishtowebname: string = "adx_publishtowebname";
		public new_hometownheroeshhdlax: string = "new_hometownheroeshhdlax";
		public gnext_bypasscustomerrescourcespecialistreviewda: string = "gnext_bypasscustomerrescourcespecialistreviewda";
		public casetypecode: string = "casetypecode";
		public traversedpath: string = "traversedpath";
		public _contactid_value: string = "_contactid_value";
		public new_claimantsattorneyrepresentative: string = "new_claimantsattorneyrepresentative";
		public contractservicelevelcode: string = "contractservicelevelcode";
		public createdonbehalfby: string = "createdonbehalfby";
		public new_dateofoutreachassignment: string = "new_dateofoutreachassignment";
		public gnext_claimassessmentenddate: string = "gnext_claimassessmentenddate";
		public gnext_finalizingdeterminationstartdate: string = "gnext_finalizingdeterminationstartdate";
		public gnext_voluntaryintoxication: string = "gnext_voluntaryintoxication";
		public gnext_benefitsspecialistassignedname: string = "gnext_benefitsspecialistassignedname";
		public gnext_preapplicationtotaltime: string = "gnext_preapplicationtotaltime";
		public gnext_psobportaluseridname: string = "gnext_psobportaluseridname";
		public gnext_claimsummaryformcompleted: string = "gnext_claimsummaryformcompleted";
		public gnext_psobdirectorreviewname: string = "gnext_psobdirectorreviewname";
		public _customerid_value: string = "_customerid_value";
		public isescalated: string = "isescalated";
		public gnext_followupreceivedname: string = "gnext_followupreceivedname";
		public _contractid_value: string = "_contractid_value";
		public modifiedby: string = "modifiedby";
		public new_reasonforpsobdenial: string = "new_reasonforpsobdenial";
		public msa_partnercontactidname: string = "msa_partnercontactidname";
		public gnext_applicationssubmitted: string = "gnext_applicationssubmitted";
		public resolvebyslastatus: string = "resolvebyslastatus";
		public gnext_psostateidname: string = "gnext_psostateidname";
		public gnext_benefitsspecialistsignaturename: string = "gnext_benefitsspecialistsignaturename";
		public gnext_psobdirectorreviewplannedduration: string = "gnext_psobdirectorreviewplannedduration";
		public gnext_claimclassificationenddate: string = "gnext_claimclassificationenddate";
		public gnext_achformreceived: string = "gnext_achformreceived";
		public gnext_employmentstatus: string = "gnext_employmentstatus";
		public gnext_accessingclaimstartdate: string = "gnext_accessingclaimstartdate";
		public gnext_totaltimebenefitsspecialistreview: string = "gnext_totaltimebenefitsspecialistreview";
		public gnext_imerequestsentdate: string = "gnext_imerequestsentdate";
		public _kbarticleid_value: string = "_kbarticleid_value";
		public new_administrativecloseoutneeded: string = "new_administrativecloseoutneeded";
		public severitycode: string = "severitycode";
		public gnext_customerresourcecenterplannedduration: string = "gnext_customerresourcecenterplannedduration";
		public decremententitlementterm: string = "decremententitlementterm";
		public gnext_seniorbenefitsspecialistreviewcompletedname: string = "gnext_seniorbenefitsspecialistreviewcompletedname";
		public new_dateofnoticeofintenttodeemclaimabando: string = "new_dateofnoticeofintenttodeemclaimabando";
		public new_durationofbjadirectorappealprocessinda: string = "new_durationofbjadirectorappealprocessinda";
		public gnext_psostatename: string = "gnext_psostatename";
		public gnext_activeyregnumbername: string = "gnext_activeyregnumbername";
		public gnext_psotitle: string = "gnext_psotitle";
		public createdbyexternalpartyyominame: string = "createdbyexternalpartyyominame";
		public onholdtime: string = "onholdtime";
		public msa_partneridyominame: string = "msa_partneridyominame";
		public gnext_bypassbenefitsspecialistreviewdate: string = "gnext_bypassbenefitsspecialistreviewdate";
		public gnext_causeofdeathname: string = "gnext_causeofdeathname";
		public ticketnumber: string = "ticketnumber";
		public entityimage: string = "entityimage";
		public gnext_commitmentname: string = "gnext_commitmentname";
		public gnext_psobresourcecenter2: string = "gnext_psobresourcecenter2";
		public influencescore: string = "influencescore";
		public gnext_bypassocfofaaddate: string = "gnext_bypassocfofaaddate";
		public overriddencreatedon: string = "overriddencreatedon";
			
    }
    /** @description Instantiates a Incident Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class Incident extends Entity {
		[key: string]: string | number
        public route: string = "incidents";
		public gnext_legalcomplexity: number;
		public gnext_legalscoringcompleteddate: string;
		public new_benefitsparalegalspecialist: string;
		public gnext_draftingcondolencedatecompleted: string;
		public gnext_applicationsunsubmitted_state: number;
		public new_911column7vcf2awardtotal: string;
		public gnext_applicationstartedflag: string;
		public gnext_markcaseasclosedname: number;
		public new_generaljobclassificationleffetc: string;
		public gnext_totaldaysopen: number;
		public gnext_totaltimecustomerresourcecenter: number;
		public gnext_bypassnotification: string;
		public gnext_psoagency: string;
		public gnext_totaltimenotificationfinal: number;
		public _gnext_psostateid_value: string;
		public numberofchildincidents: number;
		public gnext_typeofofficerother: string;
		public gnext_signnotificationlettersdate: string;
		public gnext_bypassbenefitsspecialistreviewname: number;
		public gnext_benefitsspecialistsignature: string;
		public new_911claimx: string;
		public gnext_psoblegaladvisoryominame: string;
		public gnext_finalizingdeterminationdatecompleted: string;
		public gnext_abandonmentnotification2date: string;
		public new_notes: string;
		public gnext_employmentstatusname: number;
		public gnext_bypasspreapplicationname: number;
		public gnext_econdolencesentdate: string;
		public adx_stepstoreproduce: string;
		public gnext_bypassapplication: string;
		public gnext_commitment3value: string;
		public _slaid_value: string;
		public gnext_reviewingapplicationstartdate: string;
		public casetypecodename: number;
		public gnext_claimnumberassigned: string;
		public gnext_preabandonmentsentname: number;
		public new_federalappealdecisionadorpending: string;
		public gnext_bjadirectordeemedabandoneddate: string;
		public gnext_preapplicationstartdate: string;
		public gnext_bypasscustomerresourcecenterreview: string;
		public gnext_signnotificationlettersname: number;
		public gnext_estimatedcompletiondate: string;
		public new_datebenefitsspecialistassigned: string;
		public gnext_nonactivitywarning1: string;
		public gnext_applicationverifiedflagname: number;
		public responsiblecontactidname: string;
		public gnext_legaladvisorassignedname: number;
		public gnext_internalclosurestatusname: number;
		public gnext_lastddstagename: string;
		public parentcaseidname: string;
		public gnext_bypasslegaladvisorreview: string;
		public gnext_addressconfirmation: string;
		public gnext_mailingcompletingclaimstartdate: string;
		public statuscodename: number;
		public gnext_bypassclaimantagencyfollowupname: number;
		public gnext_crcspecialistreviewcompleteddate: string;
		public gnext_plcaareviewplannedduration: number;
		public _stageid_value: string;
		public gnext_bypasspsobdirectorreviewname: number;
		public gnext_bypasscustomerresourcecenterreviewname: number;
		public gnext_onholdreasonidname: string;
		public gnext_psoblegaladvisorname: string;
		public gnext_claimantagencyfollowupdatestartdate: string;
		public gnext_lastimestagename: string;
		public gnext_bypassnotificationdate: string;
		public gnext_psobresourcecenter2yominame: string;
		public gnext_aggregatescore: number;
		public gnext_claimantagencyfollowupdateenddate: string;
		public prioritycode: string;
		public gnext_collaboration: string;
		public gnext_imepacketpreparationdatecompleted: string;
		public gnext_psobscoringcompletedname: number;
		public gnext_precommitment3valuename: number;
		public gnext_psorecordonspecialhold: string;
		public new_dateofoutreachcompletion: string;
		public new_dateofnoticeofbjadirectorappeal: string;
		public gnext_obligation3value: string;
		public gnext_applicationvalidatedname: number;
		public incidentstagecodename: number;
		public modifiedbyexternalparty: string;
		public new_911column5registeredforvcf2fundx: string;
		public gnext_precommitment3value: string;
		public owneridtype: string;
		public gnext_psobdirectorreviewdate: string;
		public gnext_preadoptionanticipated: string;
		public gnext_claimsummaryformcompleteddate: string;
		public _msa_partnerid_value: string;
		public gnext_totalplannedstagedurations: number;
		public checkemail: string;
		public new_hoappealoutcomeadorpending: string;
		public gnext_describeotherprefix: string;
		public gnext_partbsubmissionstatus: string;
		public gnext_benefitsspecialistassigneddate: string;
		public new_includedinvcfchartx: string;
		public modifiedon: string;
		public contactidname: string;
		public title: string;
		public gnext_aggregatescorecompiledname: number;
		public gnext_attorneyadvisorreviewname: number;
		public gnext_bypassscoringdate: string;
		public gnext_bypassapplicationdate: string;
		public _responsiblecontactid_value: string;
		public gnext_filingextensionreceivedname: number;
		public gnext_achformreceivedname: number;
		public gnext_bypasslegaladvisorreviewname: number;
		public owninguser: string;
		public gnext_bypassocfo: string;
		public gnext_benefitentitlementname: number;
		public servicestage: string;
		public customeridtype: string;
		public gnext_benefitsspecialistreviewcompleteddate: string;
		public gnext_bypassclaimantagencyfollowupdate: string;
		public incidentstagecode: string;
		public modifiedbyexternalpartyyominame: string;
		public gnext_noticeofobligationtoocfo: string;
		public gnext_commitmentdate: string;
		public responseby: string;
		public new_911column1numberofpotentialpsoeabene: string;
		public caseorigincodename: number;
		public gnext_optionsample2: string;
		public gnext_bypassscoring: string;
		public new_911column4vcf1awardtotal: string;
		public gnext_customerresourcecenterenddate: string;
		public gnext_psobscoringcompleteddate: string;
		public new_additionalinfo: string;
		public activitiescomplete: string;
		public gnext_applicationassignedname: number;
		public gnext_timesinceclaimcreated: number;
		public gnext_internalclaimstagename: number;
		public gnext_bypasslegaladvisorreviewdate: string;
		public gnext_inserviceofname: number;
		public blockedprofilename: number;
		public gnext_packagedeterminationnotificationstartdate: string;
		public gnext_psoaddress2: string;
		public gnext_claimsummaryformcompletedname: number;
		public gnext_psoaddress1: string;
		public slaname: string;
		public gnext_preapplicationenddate: string;
		public new_motionforreconsiderationx: string;
		public resolvebyslastatusname: number;
		public _gnext_onholdreasonid_value: string;
		public gnext_legaladvisorassigneddate: string;
		public gnext_psossnlastfour: string;
		public gnext_prefixname: number;
		public new_outreachspecialist: string;
		public sentimentvalue: number;
		public gnext_abandonmentnotification3date: string;
		public new_datebjadirectordeterminationsigned: string;
		public gnext_psocity: string;
		public gnext_dcretirementdisabilityname: number;
		public gnext_bypasssrbenefitsspecialistreview: string;
		public gnext_colorcodename: number;
		public gnext_seniorbenefitsspecialistreviewcompletedda: string;
		public owneridyominame: string;
		public gnext_legalreviewenddate: string;
		public activitiescompletename: number;
		public entitlementidname: string;
		public mergedname: number;
		public gnext_benefitsawardedname: number;
		public gnext_benefitsspecialistsignaturedate: string;
		public _masterid_value: string;
		public adx_createdbyipaddress: string;
		public transactioncurrencyidname: string;
		public _gnext_publicsafetyagencyid_value: string;
		public gnext_claimnumberassigneddate: string;
		public adx_publishtoweb: string;
		public gnext_bypassclaimantagencyfollowup: string;
		public createdby: string;
		public gnext_bypasspsobdirectorreviewdate: string;
		public gnext_bypassplcaareview: string;
		public gnext_psoemployedatthetime: string;
		public gnext_psobdirectorreviewstartdate: string;
		public contractservicelevelcodename: number;
		public gnext_psobbenefitsspecialistyominame: string;
		public firstresponsesentname: number;
		public existingcase: string;
		public gnext_grossnegligence: string;
		public gnext_imeselectionstartdate: string;
		public gnext_preabandonmentdrafted: string;
		public gnext_notification1: string;
		public gnext_signnotificationletters: string;
		public gnext_notification3: string;
		public new_inactivestatuswave2noticeofintentto: string;
		public gnext_applicationstartdate: string;
		public gnext_bypassocfofaad: string;
		public gnext_notificationfinalstartdate: string;
		public gnext_psolegaladvisoremail: string;
		public gnext_withdrawalrequestreceived: string;
		public gnext_applicationvalidated: string;
		public new_federalappealpetitionernameofcasedo: string;
		public gnext_draftdeterminationcompletedname: number;
		public responsiblecontactidyominame: string;
		public gnext_employeecompensationactname: number;
		public gnext_followuprequested: string;
		public gnext_draftingecondolencename: number;
		public gnext_applicationreviewedtimely: string;
		public gnext_appealsholdname: number;
		public gnext_ocfofaadenddate: string;
		public new_911column6awardedvcf2fundx: string;
		public gnext_srbenefitsspecialistyominame: string;
		public gnext_psozipcode: string;
		public _gnext_independentmedicalexaminarid_value: string;
		public gnext_seniorbenefitsspecialistreviewplanneddura: number;
		public gnext_aggregatescorecompileddate: string;
		public gnext_econdolencesent: string;
		public prioritycodename: number;
		public gnext_packagedeterminationnotificationdatecompl: string;
		public gnext_stopclaimtimers: string;
		public new_totalbenefitamount: string;
		public new_dateofinactivestatuswave1outreachlette: string;
		public gnext_notificationplannedduration: number;
		public gnext_ocfostartdate: string;
		public new_typeofclaimdeathordisability: string;
		public gnext_totaltimeocfo: number;
		public gnext_ocfofaadplannedduration: number;
		public adx_resolution: string;
		public gnext_partbsubmissionstatusname: number;
		public gnext_decommitted: string;
		public gnext_bypassocfofaadname: number;
		public gnext_totaltimesrbenefitsspecreview: number;
		public new_sourceof911cod: string;
		public _productid_value: string;
		public gnext_lastdecommitedyregdate: string;
		public gnext_claimantagencyfollowup: number;
		public gnext_optionsample2name: number;
		public gnext_bypassbenefitsspecialistreview: string;
		public modifiedbyexternalpartyname: string;
		public new_congressionalinquiryx: string;
		public gnext_totaltimeclaimantagencyfollowup: number;
		public gnext_grossnegligencename: number;
		public _gnext_relatedpsorecordsid_value: string;
		public severitycodename: number;
		public gnext_collaborationname: number;
		public gnext_ocfoplannedduration: number;
		public new_psobofficeoutcomeapprovaladenialdorp: string;
		public gnext_applicationassigned: string;
		public adx_supportplan: string;
		public gnext_appealsholddate: string;
		public gnext_inserviceofother: string;
		public _msa_partnercontactid_value: string;
		public gnext_activitiescompletedate: string;
		public incidentid: string;
		public socialprofileidname: string;
		public new_hearingofficerassigned: string;
		public gnext_preabandonmentsent: string;
		public gnext_customerresourcecenterstartdate: string;
		public contractdetailidname: string;
		public gnext_draftnotificationletters: string;
		public new_911column8vcfawardpaymenttodate: string;
		public gnext_scoringclaimstartdate: string;
		public gnext_seniorbenefitsspecialistsignaturedate: string;
		public new_remandedclaimx: string;
		public gnext_preapplicationplannedduration: number;
		public gnext_optionsample: string;
		public gnext_bypasssrbenefitsspecialistreviewdate: string;
		public gnext_attorneyadvisorreview: string;
		public productserialnumber: string;
		public new_federalappealx: string;
		public customersatisfactioncode: string;
		public gnext_benefitentitlement: string;
		public masteridname: string;
		public gnext_psobportaluseridyominame: string;
		public gnext_ocfofaadstartdate: string;
		public gnext_applicationreceived: string;
		public gnext_econdolencesentname: number;
		public gnext_draftnotificationlettersdate: string;
		public productidname: string;
		public gnext_independentmedicalexaminaridyominame: string;
		public gnext_psobbenefitsspecialistname: string;
		public gnext_applicationstartedflagname: number;
		public gnext_addressconfirmationname: number;
		public gnext_seniorbenefitsspecialistreviewcompleted: string;
		public gnext_withdrawalrequestreceivedname: number;
		public firstresponsebykpiidname: string;
		public _subjectid_value: string;
		public gnext_obligation3valuename: number;
		public gnext_seniorbenefitsspecialistsignature: string;
		public gnext_benefitsspecialistreviewcompletedname: number;
		public gnext_bypassplcaareviewname: number;
		public gnext_typeofofficername: number;
		public new_durationofdeterminationprocessindaysfro: string;
		public gnext_applicationenddate: string;
		public slainvokedidname: string;
		public customercontacted: string;
		public gnext_applicationsvalidated: number;
		public gnext_nonactivitywarning1name: number;
		public gnext_applicationlinkedname: number;
		public firstresponseslastatus: string;
		public new_administrativecloseoutneededforhoappeal: string;
		public gnext_draftnotificationlettersname: number;
		public gnext_psoblegaladvisor: string;
		public gnext_lastpsastatus: string;
		public new_reasonforbjadirectordenial: string;
		public contactidyominame: string;
		public gnext_bypasspreapplication: string;
		public _resolvebykpiid_value: string;
		public gnext_psocountry: string;
		public timezoneruleversionnumber: number;
		public gnext_legalscoringcompleted: string;
		public gnext_abandonmentnotification1date: string;
		public gnext_achformvalidated: string;
		public gnext_imepacketcompleteddate: string;
		public gnext_psolegaladvisorphone: string;
		public gnext_imereviewedqcdate: string;
		public escalatedon: string;
		public primarycontactidname: string;
		public createdbyexternalpartyname: string;
		public gnext_psobdirectorreviewenddate: string;
		public gnext_psobresourceyominame: string;
		public new_specificissueforissuecase: string;
		public gnext_bypasspsobdirectorreview: string;
		public gnext_filingextensionreceived: string;
		public gnext_filingextensionreviewed: string;
		public gnext_bypasssrbenefitsspecialistreviewname: number;
		public gnext_totaltimescoring: number;
		public new_claimscore: string;
		public importsequencenumber: number;
		public merged: string;
		public new_positiontitlespecificorexpanded: string;
		public gnext_applicationverifiedflag: string;
		public owneridname: string;
		public new_dayspendingtodate: string;
		public gnext_psostate: string;
		public new_exactdurationofbenefitsspecialistreview: string;
		public gnext_filingextensionresponsesent: string;
		public createdon: string;
		public gnext_psobscoringcompleted: string;
		public msa_partneridname: string;
		public gnext_psobdirectorsignaturedate: string;
		public gnext_draftingcondolencestartdate: string;
		public adx_createdbyusername: string;
		public gnext_employeecompensationact: string;
		public new_durationfromdateclaimnumberassignedtod: string;
		public gnext_applicationssubmitted_state: number;
		public gnext_ocfoenddate: string;
		public gnext_dateofdeath: string;
		public gnext_psovalidatedstatusname: number;
		public gnext_benefitsspecialistreviewcompleted: string;
		public lastonholdtime: string;
		public blockedprofile: string;
		public resolvebykpiidname: string;
		public gnext_bypassocfodate: string;
		public gnext_intentionaldeath: string;
		public gnext_notificationstartdate: string;
		public gnext_timesincecreation: number;
		public gnext_withdrawalacknowledgmentlettersent: string;
		public entityimage_timestamp: number;
		public gnext_dateofinjury: string;
		public new_durationoflegalreviewprocessatpsoboffi: string;
		public new_hearingofficerhoappealx: string;
		public gnext_socialsecuritynumber: string;
		public gnext_followuprequesteddate: string;
		public gnext_lastname: string;
		public gnext_notificationenddate: string;
		public msa_partnercontactidyominame: string;
		public gnext_applicationsvalidated_state: number;
		public customeridname: string;
		public gnext_sendnotificationlettersname: number;
		public gnext_accessingclaimdatecompleted: string;
		public modifiedbyyominame: string;
		public gnext_lastchildentityupdateddate: string;
		public new_hearingdate: string;
		public gnext_firstname: string;
		public _ownerid_value: string;
		public followuptaskcreated: string;
		public gnext_applicationsubmittedflagname: number;
		public gnext_inserviceof: string;
		public new_911column3awardedvcf1benefitx: string;
		public gnext_officernamesuffix: string;
		public gnext_totalactualstagedurations: number;
		public new_datacontrolnumberdcnyregdocnumber: string;
		public billedserviceunits: number;
		public versionnumber: number;
		public gnext_seniorbenefitsspecialistreviewenddate: string;
		public gnext_applicationsunsubmitted: number;
		public gnext_addressconfirmationdate: string;
		public gnext_reviewnotificationletters: string;
		public new_assignedlegaladvisorla: string;
		public actualserviceunits: number;
		public gnext_srbenefitsspecialist: string;
		public gnext_lastpsastatusname: number;
		public gnext_applicationsubmittedflag: string;
		public messagetypecode: string;
		public gnext_psorecordonspecialholdname: number;
		public gnext_precommitment: string;
		public gnext_decommittedname: number;
		public exchangerate: number;
		public gnext_benefitsawarded: string;
		public gnext_dcretirementdisability: string;
		public gnext_plcaasignaturename: number;
		public followupby: string;
		public gnext_internalclosurestatus: string;
		public accountidyominame: string;
		public gnext_collaborationdate: string;
		public gnext_draftdeterminationcompleteddate: string;
		public gnext_applicationsunsubmitted_date: string;
		public gnext_stopclaimtimersname: number;
		public gnext_mailingcompletingclaimdatecompleted: string;
		public gnext_psovalidatedstatus: string;
		public createdbyyominame: string;
		public new_dateofincidentdeathordisability: string;
		public gnext_applicationsvalidated_date: string;
		public gnext_bypassocfoname: number;
		public gnext_psorecordonhold: string;
		public new_bjadirectorappealoutcomeadorpending: string;
		public gnext_psobresourcecenter2name: string;
		public gnext_totaltimeplcaareview: number;
		public gnext_followupreceived: string;
		public new_durationofoutreachindaysfromoutreachas: string;
		public gnext_applicationpartb_date: string;
		public gnext_performinglegalreviewdatecompleted: string;
		public adx_modifiedbyipaddress: string;
		public gnext_filingextensionresponsesentname: number;
		public gnext_sendnotificationletters: string;
		public _accountid_value: string;
		public gnext_plcaasignature: string;
		public kbarticleidname: string;
		public gnext_draftingecondolencedate: string;
		public gnext_precommitmentdate: string;
		public gnext_imepacketsentdate: string;
		public gnext_totaltimelegalreview: number;
		public gnext_totaltimeapplication: number;
		public gnext_publicsafetyagencyidname: string;
		public gnext_abandonmentletterrevieweddate: string;
		public gnext_srbenefitsspecialistname: string;
		public _slainvokedid_value: string;
		public accountidname: string;
		public gnext_legaladvisorreview: string;
		public gnext_dateofbirth: string;
		public gnext_psorecordnumberassigneddate: string;
		public gnext_totaltimeocfofaad: number;
		public new_911column2relatedpsoeaclaims: string;
		public new_causeofdeathcod: string;
		public gnext_nulldatefield: string;
		public gnext_psobresourcename: string;
		public gnext_optionsamplename: number;
		public gnext_notificationfinalenddate: string;
		public gnext_legalreviewplannedduration: number;
		public gnext_prefix: string;
		public _primarycontactid_value: string;
		public gnext_reviewnotificationlettersname: number;
		public new_agency: string;
		public gnext_draftingdeterminationdatecompleted: string;
		public adx_supportplanname: string;
		public gnext_applicationssubmitted_date: string;
		public new_psobofficedeterminationx: string;
		public gnext_factualcomplexity: number;
		public gnext_commitment: string;
		public gnext_plcaasignaturedate: string;
		public gnext_abandonmentletterdrafteddate: string;
		public customeridyominame: string;
		public gnext_claimassessmentplannedduration: number;
		public firstresponsesent: string;
		public createdbyexternalparty: string;
		public gnext_buildingapplicationstartdate: string;
		public statuscode: string;
		public gnext_performinglegalreviewstartdate: string;
		public gnext_seniorbenefitsspecialistreviewstartdate: string;
		public gnext_imereceiveddate: string;
		public entityimage_url: string;
		public gnext_psoaddress3: string;
		public adx_resolutiondate: string;
		public createdbyname: string;
		public _contractdetailid_value: string;
		public subjectidname: string;
		public new_durationofhearingofficerappealprocessin: string;
		public gnext_imepacketpreparationstartdate: string;
		public new_issuecasesclaimsonholdbefore52013tra: string;
		public gnext_currentdatetime: string;
		public firstresponseslastatusname: number;
		public routecase: string;
		public gnext_commitment3valuename: number;
		public gnext_socialsecuritynumberprefix: string;
		public gnext_withdrawalacknowledgmentlettersentname: number;
		public adx_supportrequestname: string;
		public gnext_totaltimenotification: number;
		public gnext_followupreceiveddate: string;
		public gnext_psobbenefitsspecialist: string;
		public gnext_notificationfinalplannedduration: number;
		public gnext_legaladvisorreviewname: number;
		public gnext_paymentmade: string;
		public gnext_reviewingapplicationdatecompleted: string;
		public gnext_scoringclaimdatecompleted: string;
		public gnext_relatedpsorecordsidname: string;
		public new_reasonforhodenial: string;
		public gnext_markcaseasclosed: string;
		public gnext_psoemployedatthetimename: number;
		public primarycontactidyominame: string;
		public gnext_psobresource: string;
		public gnext_achformreceiveddate: string;
		public gnext_intentionalmisconductname: number;
		public gnext_psofullname: string;
		public gnext_lastprocessname: string;
		public gnext_appealshold: string;
		public gnext_paymentmadedate: string;
		public gnext_psaapplicationsubmittedname: number;
		public gnext_plcaareviewstartdate: string;
		public owningbusinessunit: string;
		public _gnext_psobportaluserid_value: string;
		public contractidname: string;
		public checkemailname: number;
		public gnext_psaapplicationsubmitted: string;
		public gnext_colorcode: string;
		public gnext_preabandonmentreviewedname: number;
		public gnext_psobdirectorsignature: string;
		public gnext_legaladvisorreviewdate: string;
		public gnext_draftingecondolence: string;
		public _entityimageid_value: string;
		public gnext_psorecordonholdname: number;
		public createdonbehalfbyname: string;
		public gnext_imereceiptstartdate: string;
		public gnext_plcaareviewenddate: string;
		public utcconversiontimezonecode: number;
		public gnext_imereceiptdatecompleted: string;
		public modifiedonbehalfby: string;
		public modifiedbyname: string;
		public gnext_paymentmadename: number;
		public _transactioncurrencyid_value: string;
		public customersatisfactioncodename: number;
		public statecode: number;
		public gnext_seniorbenefitsspecialistsignaturename: number;
		public new_datehodeterminationsigned: string;
		public gnext_efficiency: number;
		public adx_modifiedbyusername: string;
		public isescalatedname: number;
		public new_dateofnoticeofhoappeal: string;
		public _entitlementid_value: string;
		public _parentcaseid_value: string;
		public gnext_notification2: string;
		public gnext_applicationpartblookup: string;
		public gnext_publicsafetyagencyidyominame: string;
		public new_bjadirectorappealx: string;
		public gnext_applicationplannedduration: number;
		public gnext_applicationpartb: number;
		public gnext_activeyregnumber: string;
		public gnext_achformvalidateddate: string;
		public new_specificcauseofdeathfromdeathcertificat: string;
		public gnext_followuprequestedname: number;
		public gnext_reviewnotificationlettersdate: string;
		public gnext_bypassnotificationname: number;
		public gnext_applicationreceivedname: number;
		public isdecrementingname: number;
		public gnext_intentionaldeathname: number;
		public gnext_bypassapplicationname: number;
		public servicestagename: number;
		public gnext_totaltimepsobdirectorreview: number;
		public followuptaskcreatedname: number;
		public gnext_buildingapplicationdatecompleted: string;
		public gnext_noticeofobligationtoocfoname: number;
		public gnext_bypassplcaareviewdate: string;
		public new_datesenttobudget: string;
		public new_durationofentireclaimsprocessindaysfro: string;
		public gnext_legalreviewstartdate: string;
		public isdecrementing: string;
		public createdonbehalfbyyominame: string;
		public new_durationofbenefitsspecialistreviewinday: string;
		public adx_supportrequest: string;
		public _processid_value: string;
		public gnext_psobdirectorreview: string;
		public gnext_preabandonmentreviewed: string;
		public gnext_precommitmentname: number;
		public gnext_preabandonmentdraftedname: number;
		public gnext_imeselectiondatecompleted: string;
		public modifiedonbehalfbyyominame: string;
		public description: string;
		public gnext_benefitsspecialistassigned: string;
		public gnext_noticeofobligationtoocfodate: string;
		public gnext_typeofofficer: string;
		public gnext_claimclassificationstartdate: string;
		public gnext_independentmedicalexaminaridname: string;
		public gnext_causeofdeath: string;
		public new_inactivestatuswave1outreachletterx: string;
		public gnext_internalclaimstage: string;
		public gnext_attorneyadvisorreviewdate: string;
		public gnext_bypassscoringname: number;
		public gnext_applicationpartb_state: number;
		public gnext_applicationpartblookupname: string;
		public gnext_draftingdeterminationstartdate: string;
		public gnext_draftdeterminationcompleted: string;
		public statecodename: number;
		public gnext_claimclassificationplannedduration: number;
		public gnext_legaladvisorassigned: string;
		public gnext_ocfo: string;
		public decremententitlementtermname: number;
		public _socialprofileid_value: string;
		public _firstresponsebykpiid_value: string;
		public gnext_applicationlinked: string;
		public gnext_officerstitle: string;
		public gnext_aggregatescorecompiled: string;
		public gnext_totaldaysclaimopen: number;
		public gnext_sendnotificationlettersdate: string;
		public gnext_intentionalmisconduct: string;
		public gnext_legalscoringcompletedname: number;
		public gnext_filingextensionreviewedname: number;
		public gnext_voluntaryintoxicationname: number;
		public modifiedonbehalfbyname: string;
		public resolveby: string;
		public gnext_middlename: string;
		public gnext_applicationreviewedtimelyname: number;
		public gnext_abandonmentlettersentdate: string;
		public gnext_benefitentitlementexplanation: string;
		public gnext_achformvalidatedname: number;
		public owningteam: string;
		public messagetypecodename: number;
		public caseorigincode: string;
		public gnext_bypasspreapplcationdate: string;
		public gnext_psobdirectorsignaturename: number;
		public gnext_claimassessmentstartdate: string;
		public adx_publishtowebname: number;
		public new_hometownheroeshhdlax: string;
		public gnext_bypasscustomerrescourcespecialistreviewda: string;
		public casetypecode: string;
		public traversedpath: string;
		public _contactid_value: string;
		public new_claimantsattorneyrepresentative: string;
		public contractservicelevelcode: string;
		public createdonbehalfby: string;
		public new_dateofoutreachassignment: string;
		public gnext_claimassessmentenddate: string;
		public gnext_finalizingdeterminationstartdate: string;
		public gnext_voluntaryintoxication: string;
		public gnext_benefitsspecialistassignedname: number;
		public gnext_preapplicationtotaltime: number;
		public gnext_psobportaluseridname: string;
		public gnext_claimsummaryformcompleted: string;
		public gnext_psobdirectorreviewname: number;
		public _customerid_value: string;
		public isescalated: string;
		public gnext_followupreceivedname: number;
		public _contractid_value: string;
		public modifiedby: string;
		public new_reasonforpsobdenial: string;
		public msa_partnercontactidname: string;
		public gnext_applicationssubmitted: number;
		public resolvebyslastatus: string;
		public gnext_psostateidname: string;
		public gnext_benefitsspecialistsignaturename: number;
		public gnext_psobdirectorreviewplannedduration: number;
		public gnext_claimclassificationenddate: string;
		public gnext_achformreceived: string;
		public gnext_employmentstatus: string;
		public gnext_accessingclaimstartdate: string;
		public gnext_totaltimebenefitsspecialistreview: number;
		public gnext_imerequestsentdate: string;
		public _kbarticleid_value: string;
		public new_administrativecloseoutneeded: string;
		public severitycode: string;
		public gnext_customerresourcecenterplannedduration: number;
		public decremententitlementterm: string;
		public gnext_seniorbenefitsspecialistreviewcompletedname: number;
		public new_dateofnoticeofintenttodeemclaimabando: string;
		public new_durationofbjadirectorappealprocessinda: string;
		public gnext_psostatename: number;
		public gnext_activeyregnumbername: string;
		public gnext_psotitle: string;
		public createdbyexternalpartyyominame: string;
		public onholdtime: number;
		public msa_partneridyominame: string;
		public gnext_bypassbenefitsspecialistreviewdate: string;
		public gnext_causeofdeathname: number;
		public ticketnumber: string;
		public entityimage: number;
		public gnext_commitmentname: number;
		public gnext_psobresourcecenter2: string;
		public influencescore: number;
		public gnext_bypassocfofaaddate: string;
		public overriddencreatedon: string;
			
        
        constructor(initData?: IIncident) {
			super("incidents");        
            if (initData == undefined) return;
			this.gnext_legalcomplexity = initData.gnext_legalcomplexity;
			this.gnext_legalscoringcompleteddate = initData.gnext_legalscoringcompleteddate;
			this.new_benefitsparalegalspecialist = initData.new_benefitsparalegalspecialist;
			this.gnext_draftingcondolencedatecompleted = initData.gnext_draftingcondolencedatecompleted;
			this.gnext_applicationsunsubmitted_state = initData.gnext_applicationsunsubmitted_state;
			this.new_911column7vcf2awardtotal = initData.new_911column7vcf2awardtotal;
			this.gnext_applicationstartedflag = initData.gnext_applicationstartedflag;
			this.gnext_markcaseasclosedname = initData.gnext_markcaseasclosedname;
			this.new_generaljobclassificationleffetc = initData.new_generaljobclassificationleffetc;
			this.gnext_totaldaysopen = initData.gnext_totaldaysopen;
			this.gnext_totaltimecustomerresourcecenter = initData.gnext_totaltimecustomerresourcecenter;
			this.gnext_bypassnotification = initData.gnext_bypassnotification;
			this.gnext_psoagency = initData.gnext_psoagency;
			this.gnext_totaltimenotificationfinal = initData.gnext_totaltimenotificationfinal;
			this._gnext_psostateid_value = initData._gnext_psostateid_value;
			this.numberofchildincidents = initData.numberofchildincidents;
			this.gnext_typeofofficerother = initData.gnext_typeofofficerother;
			this.gnext_signnotificationlettersdate = initData.gnext_signnotificationlettersdate;
			this.gnext_bypassbenefitsspecialistreviewname = initData.gnext_bypassbenefitsspecialistreviewname;
			this.gnext_benefitsspecialistsignature = initData.gnext_benefitsspecialistsignature;
			this.new_911claimx = initData.new_911claimx;
			this.gnext_psoblegaladvisoryominame = initData.gnext_psoblegaladvisoryominame;
			this.gnext_finalizingdeterminationdatecompleted = initData.gnext_finalizingdeterminationdatecompleted;
			this.gnext_abandonmentnotification2date = initData.gnext_abandonmentnotification2date;
			this.new_notes = initData.new_notes;
			this.gnext_employmentstatusname = initData.gnext_employmentstatusname;
			this.gnext_bypasspreapplicationname = initData.gnext_bypasspreapplicationname;
			this.gnext_econdolencesentdate = initData.gnext_econdolencesentdate;
			this.adx_stepstoreproduce = initData.adx_stepstoreproduce;
			this.gnext_bypassapplication = initData.gnext_bypassapplication;
			this.gnext_commitment3value = initData.gnext_commitment3value;
			this._slaid_value = initData._slaid_value;
			this.gnext_reviewingapplicationstartdate = initData.gnext_reviewingapplicationstartdate;
			this.casetypecodename = initData.casetypecodename;
			this.gnext_claimnumberassigned = initData.gnext_claimnumberassigned;
			this.gnext_preabandonmentsentname = initData.gnext_preabandonmentsentname;
			this.new_federalappealdecisionadorpending = initData.new_federalappealdecisionadorpending;
			this.gnext_bjadirectordeemedabandoneddate = initData.gnext_bjadirectordeemedabandoneddate;
			this.gnext_preapplicationstartdate = initData.gnext_preapplicationstartdate;
			this.gnext_bypasscustomerresourcecenterreview = initData.gnext_bypasscustomerresourcecenterreview;
			this.gnext_signnotificationlettersname = initData.gnext_signnotificationlettersname;
			this.gnext_estimatedcompletiondate = initData.gnext_estimatedcompletiondate;
			this.new_datebenefitsspecialistassigned = initData.new_datebenefitsspecialistassigned;
			this.gnext_nonactivitywarning1 = initData.gnext_nonactivitywarning1;
			this.gnext_applicationverifiedflagname = initData.gnext_applicationverifiedflagname;
			this.responsiblecontactidname = initData.responsiblecontactidname;
			this.gnext_legaladvisorassignedname = initData.gnext_legaladvisorassignedname;
			this.gnext_internalclosurestatusname = initData.gnext_internalclosurestatusname;
			this.gnext_lastddstagename = initData.gnext_lastddstagename;
			this.parentcaseidname = initData.parentcaseidname;
			this.gnext_bypasslegaladvisorreview = initData.gnext_bypasslegaladvisorreview;
			this.gnext_addressconfirmation = initData.gnext_addressconfirmation;
			this.gnext_mailingcompletingclaimstartdate = initData.gnext_mailingcompletingclaimstartdate;
			this.statuscodename = initData.statuscodename;
			this.gnext_bypassclaimantagencyfollowupname = initData.gnext_bypassclaimantagencyfollowupname;
			this.gnext_crcspecialistreviewcompleteddate = initData.gnext_crcspecialistreviewcompleteddate;
			this.gnext_plcaareviewplannedduration = initData.gnext_plcaareviewplannedduration;
			this._stageid_value = initData._stageid_value;
			this.gnext_bypasspsobdirectorreviewname = initData.gnext_bypasspsobdirectorreviewname;
			this.gnext_bypasscustomerresourcecenterreviewname = initData.gnext_bypasscustomerresourcecenterreviewname;
			this.gnext_onholdreasonidname = initData.gnext_onholdreasonidname;
			this.gnext_psoblegaladvisorname = initData.gnext_psoblegaladvisorname;
			this.gnext_claimantagencyfollowupdatestartdate = initData.gnext_claimantagencyfollowupdatestartdate;
			this.gnext_lastimestagename = initData.gnext_lastimestagename;
			this.gnext_bypassnotificationdate = initData.gnext_bypassnotificationdate;
			this.gnext_psobresourcecenter2yominame = initData.gnext_psobresourcecenter2yominame;
			this.gnext_aggregatescore = initData.gnext_aggregatescore;
			this.gnext_claimantagencyfollowupdateenddate = initData.gnext_claimantagencyfollowupdateenddate;
			this.prioritycode = initData.prioritycode;
			this.gnext_collaboration = initData.gnext_collaboration;
			this.gnext_imepacketpreparationdatecompleted = initData.gnext_imepacketpreparationdatecompleted;
			this.gnext_psobscoringcompletedname = initData.gnext_psobscoringcompletedname;
			this.gnext_precommitment3valuename = initData.gnext_precommitment3valuename;
			this.gnext_psorecordonspecialhold = initData.gnext_psorecordonspecialhold;
			this.new_dateofoutreachcompletion = initData.new_dateofoutreachcompletion;
			this.new_dateofnoticeofbjadirectorappeal = initData.new_dateofnoticeofbjadirectorappeal;
			this.gnext_obligation3value = initData.gnext_obligation3value;
			this.gnext_applicationvalidatedname = initData.gnext_applicationvalidatedname;
			this.incidentstagecodename = initData.incidentstagecodename;
			this.modifiedbyexternalparty = initData.modifiedbyexternalparty;
			this.new_911column5registeredforvcf2fundx = initData.new_911column5registeredforvcf2fundx;
			this.gnext_precommitment3value = initData.gnext_precommitment3value;
			this.owneridtype = initData.owneridtype;
			this.gnext_psobdirectorreviewdate = initData.gnext_psobdirectorreviewdate;
			this.gnext_preadoptionanticipated = initData.gnext_preadoptionanticipated;
			this.gnext_claimsummaryformcompleteddate = initData.gnext_claimsummaryformcompleteddate;
			this._msa_partnerid_value = initData._msa_partnerid_value;
			this.gnext_totalplannedstagedurations = initData.gnext_totalplannedstagedurations;
			this.checkemail = initData.checkemail;
			this.new_hoappealoutcomeadorpending = initData.new_hoappealoutcomeadorpending;
			this.gnext_describeotherprefix = initData.gnext_describeotherprefix;
			this.gnext_partbsubmissionstatus = initData.gnext_partbsubmissionstatus;
			this.gnext_benefitsspecialistassigneddate = initData.gnext_benefitsspecialistassigneddate;
			this.new_includedinvcfchartx = initData.new_includedinvcfchartx;
			this.modifiedon = initData.modifiedon;
			this.contactidname = initData.contactidname;
			this.title = initData.title;
			this.gnext_aggregatescorecompiledname = initData.gnext_aggregatescorecompiledname;
			this.gnext_attorneyadvisorreviewname = initData.gnext_attorneyadvisorreviewname;
			this.gnext_bypassscoringdate = initData.gnext_bypassscoringdate;
			this.gnext_bypassapplicationdate = initData.gnext_bypassapplicationdate;
			this._responsiblecontactid_value = initData._responsiblecontactid_value;
			this.gnext_filingextensionreceivedname = initData.gnext_filingextensionreceivedname;
			this.gnext_achformreceivedname = initData.gnext_achformreceivedname;
			this.gnext_bypasslegaladvisorreviewname = initData.gnext_bypasslegaladvisorreviewname;
			this.owninguser = initData.owninguser;
			this.gnext_bypassocfo = initData.gnext_bypassocfo;
			this.gnext_benefitentitlementname = initData.gnext_benefitentitlementname;
			this.servicestage = initData.servicestage;
			this.customeridtype = initData.customeridtype;
			this.gnext_benefitsspecialistreviewcompleteddate = initData.gnext_benefitsspecialistreviewcompleteddate;
			this.gnext_bypassclaimantagencyfollowupdate = initData.gnext_bypassclaimantagencyfollowupdate;
			this.incidentstagecode = initData.incidentstagecode;
			this.modifiedbyexternalpartyyominame = initData.modifiedbyexternalpartyyominame;
			this.gnext_noticeofobligationtoocfo = initData.gnext_noticeofobligationtoocfo;
			this.gnext_commitmentdate = initData.gnext_commitmentdate;
			this.responseby = initData.responseby;
			this.new_911column1numberofpotentialpsoeabene = initData.new_911column1numberofpotentialpsoeabene;
			this.caseorigincodename = initData.caseorigincodename;
			this.gnext_optionsample2 = initData.gnext_optionsample2;
			this.gnext_bypassscoring = initData.gnext_bypassscoring;
			this.new_911column4vcf1awardtotal = initData.new_911column4vcf1awardtotal;
			this.gnext_customerresourcecenterenddate = initData.gnext_customerresourcecenterenddate;
			this.gnext_psobscoringcompleteddate = initData.gnext_psobscoringcompleteddate;
			this.new_additionalinfo = initData.new_additionalinfo;
			this.activitiescomplete = initData.activitiescomplete;
			this.gnext_applicationassignedname = initData.gnext_applicationassignedname;
			this.gnext_timesinceclaimcreated = initData.gnext_timesinceclaimcreated;
			this.gnext_internalclaimstagename = initData.gnext_internalclaimstagename;
			this.gnext_bypasslegaladvisorreviewdate = initData.gnext_bypasslegaladvisorreviewdate;
			this.gnext_inserviceofname = initData.gnext_inserviceofname;
			this.blockedprofilename = initData.blockedprofilename;
			this.gnext_packagedeterminationnotificationstartdate = initData.gnext_packagedeterminationnotificationstartdate;
			this.gnext_psoaddress2 = initData.gnext_psoaddress2;
			this.gnext_claimsummaryformcompletedname = initData.gnext_claimsummaryformcompletedname;
			this.gnext_psoaddress1 = initData.gnext_psoaddress1;
			this.slaname = initData.slaname;
			this.gnext_preapplicationenddate = initData.gnext_preapplicationenddate;
			this.new_motionforreconsiderationx = initData.new_motionforreconsiderationx;
			this.resolvebyslastatusname = initData.resolvebyslastatusname;
			this._gnext_onholdreasonid_value = initData._gnext_onholdreasonid_value;
			this.gnext_legaladvisorassigneddate = initData.gnext_legaladvisorassigneddate;
			this.gnext_psossnlastfour = initData.gnext_psossnlastfour;
			this.gnext_prefixname = initData.gnext_prefixname;
			this.new_outreachspecialist = initData.new_outreachspecialist;
			this.sentimentvalue = initData.sentimentvalue;
			this.gnext_abandonmentnotification3date = initData.gnext_abandonmentnotification3date;
			this.new_datebjadirectordeterminationsigned = initData.new_datebjadirectordeterminationsigned;
			this.gnext_psocity = initData.gnext_psocity;
			this.gnext_dcretirementdisabilityname = initData.gnext_dcretirementdisabilityname;
			this.gnext_bypasssrbenefitsspecialistreview = initData.gnext_bypasssrbenefitsspecialistreview;
			this.gnext_colorcodename = initData.gnext_colorcodename;
			this.gnext_seniorbenefitsspecialistreviewcompletedda = initData.gnext_seniorbenefitsspecialistreviewcompletedda;
			this.owneridyominame = initData.owneridyominame;
			this.gnext_legalreviewenddate = initData.gnext_legalreviewenddate;
			this.activitiescompletename = initData.activitiescompletename;
			this.entitlementidname = initData.entitlementidname;
			this.mergedname = initData.mergedname;
			this.gnext_benefitsawardedname = initData.gnext_benefitsawardedname;
			this.gnext_benefitsspecialistsignaturedate = initData.gnext_benefitsspecialistsignaturedate;
			this._masterid_value = initData._masterid_value;
			this.adx_createdbyipaddress = initData.adx_createdbyipaddress;
			this.transactioncurrencyidname = initData.transactioncurrencyidname;
			this._gnext_publicsafetyagencyid_value = initData._gnext_publicsafetyagencyid_value;
			this.gnext_claimnumberassigneddate = initData.gnext_claimnumberassigneddate;
			this.adx_publishtoweb = initData.adx_publishtoweb;
			this.gnext_bypassclaimantagencyfollowup = initData.gnext_bypassclaimantagencyfollowup;
			this.createdby = initData.createdby;
			this.gnext_bypasspsobdirectorreviewdate = initData.gnext_bypasspsobdirectorreviewdate;
			this.gnext_bypassplcaareview = initData.gnext_bypassplcaareview;
			this.gnext_psoemployedatthetime = initData.gnext_psoemployedatthetime;
			this.gnext_psobdirectorreviewstartdate = initData.gnext_psobdirectorreviewstartdate;
			this.contractservicelevelcodename = initData.contractservicelevelcodename;
			this.gnext_psobbenefitsspecialistyominame = initData.gnext_psobbenefitsspecialistyominame;
			this.firstresponsesentname = initData.firstresponsesentname;
			this.existingcase = initData.existingcase;
			this.gnext_grossnegligence = initData.gnext_grossnegligence;
			this.gnext_imeselectionstartdate = initData.gnext_imeselectionstartdate;
			this.gnext_preabandonmentdrafted = initData.gnext_preabandonmentdrafted;
			this.gnext_notification1 = initData.gnext_notification1;
			this.gnext_signnotificationletters = initData.gnext_signnotificationletters;
			this.gnext_notification3 = initData.gnext_notification3;
			this.new_inactivestatuswave2noticeofintentto = initData.new_inactivestatuswave2noticeofintentto;
			this.gnext_applicationstartdate = initData.gnext_applicationstartdate;
			this.gnext_bypassocfofaad = initData.gnext_bypassocfofaad;
			this.gnext_notificationfinalstartdate = initData.gnext_notificationfinalstartdate;
			this.gnext_psolegaladvisoremail = initData.gnext_psolegaladvisoremail;
			this.gnext_withdrawalrequestreceived = initData.gnext_withdrawalrequestreceived;
			this.gnext_applicationvalidated = initData.gnext_applicationvalidated;
			this.new_federalappealpetitionernameofcasedo = initData.new_federalappealpetitionernameofcasedo;
			this.gnext_draftdeterminationcompletedname = initData.gnext_draftdeterminationcompletedname;
			this.responsiblecontactidyominame = initData.responsiblecontactidyominame;
			this.gnext_employeecompensationactname = initData.gnext_employeecompensationactname;
			this.gnext_followuprequested = initData.gnext_followuprequested;
			this.gnext_draftingecondolencename = initData.gnext_draftingecondolencename;
			this.gnext_applicationreviewedtimely = initData.gnext_applicationreviewedtimely;
			this.gnext_appealsholdname = initData.gnext_appealsholdname;
			this.gnext_ocfofaadenddate = initData.gnext_ocfofaadenddate;
			this.new_911column6awardedvcf2fundx = initData.new_911column6awardedvcf2fundx;
			this.gnext_srbenefitsspecialistyominame = initData.gnext_srbenefitsspecialistyominame;
			this.gnext_psozipcode = initData.gnext_psozipcode;
			this._gnext_independentmedicalexaminarid_value = initData._gnext_independentmedicalexaminarid_value;
			this.gnext_seniorbenefitsspecialistreviewplanneddura = initData.gnext_seniorbenefitsspecialistreviewplanneddura;
			this.gnext_aggregatescorecompileddate = initData.gnext_aggregatescorecompileddate;
			this.gnext_econdolencesent = initData.gnext_econdolencesent;
			this.prioritycodename = initData.prioritycodename;
			this.gnext_packagedeterminationnotificationdatecompl = initData.gnext_packagedeterminationnotificationdatecompl;
			this.gnext_stopclaimtimers = initData.gnext_stopclaimtimers;
			this.new_totalbenefitamount = initData.new_totalbenefitamount;
			this.new_dateofinactivestatuswave1outreachlette = initData.new_dateofinactivestatuswave1outreachlette;
			this.gnext_notificationplannedduration = initData.gnext_notificationplannedduration;
			this.gnext_ocfostartdate = initData.gnext_ocfostartdate;
			this.new_typeofclaimdeathordisability = initData.new_typeofclaimdeathordisability;
			this.gnext_totaltimeocfo = initData.gnext_totaltimeocfo;
			this.gnext_ocfofaadplannedduration = initData.gnext_ocfofaadplannedduration;
			this.adx_resolution = initData.adx_resolution;
			this.gnext_partbsubmissionstatusname = initData.gnext_partbsubmissionstatusname;
			this.gnext_decommitted = initData.gnext_decommitted;
			this.gnext_bypassocfofaadname = initData.gnext_bypassocfofaadname;
			this.gnext_totaltimesrbenefitsspecreview = initData.gnext_totaltimesrbenefitsspecreview;
			this.new_sourceof911cod = initData.new_sourceof911cod;
			this._productid_value = initData._productid_value;
			this.gnext_lastdecommitedyregdate = initData.gnext_lastdecommitedyregdate;
			this.gnext_claimantagencyfollowup = initData.gnext_claimantagencyfollowup;
			this.gnext_optionsample2name = initData.gnext_optionsample2name;
			this.gnext_bypassbenefitsspecialistreview = initData.gnext_bypassbenefitsspecialistreview;
			this.modifiedbyexternalpartyname = initData.modifiedbyexternalpartyname;
			this.new_congressionalinquiryx = initData.new_congressionalinquiryx;
			this.gnext_totaltimeclaimantagencyfollowup = initData.gnext_totaltimeclaimantagencyfollowup;
			this.gnext_grossnegligencename = initData.gnext_grossnegligencename;
			this._gnext_relatedpsorecordsid_value = initData._gnext_relatedpsorecordsid_value;
			this.severitycodename = initData.severitycodename;
			this.gnext_collaborationname = initData.gnext_collaborationname;
			this.gnext_ocfoplannedduration = initData.gnext_ocfoplannedduration;
			this.new_psobofficeoutcomeapprovaladenialdorp = initData.new_psobofficeoutcomeapprovaladenialdorp;
			this.gnext_applicationassigned = initData.gnext_applicationassigned;
			this.adx_supportplan = initData.adx_supportplan;
			this.gnext_appealsholddate = initData.gnext_appealsholddate;
			this.gnext_inserviceofother = initData.gnext_inserviceofother;
			this._msa_partnercontactid_value = initData._msa_partnercontactid_value;
			this.gnext_activitiescompletedate = initData.gnext_activitiescompletedate;
			this.incidentid = initData.incidentid;
			this.socialprofileidname = initData.socialprofileidname;
			this.new_hearingofficerassigned = initData.new_hearingofficerassigned;
			this.gnext_preabandonmentsent = initData.gnext_preabandonmentsent;
			this.gnext_customerresourcecenterstartdate = initData.gnext_customerresourcecenterstartdate;
			this.contractdetailidname = initData.contractdetailidname;
			this.gnext_draftnotificationletters = initData.gnext_draftnotificationletters;
			this.new_911column8vcfawardpaymenttodate = initData.new_911column8vcfawardpaymenttodate;
			this.gnext_scoringclaimstartdate = initData.gnext_scoringclaimstartdate;
			this.gnext_seniorbenefitsspecialistsignaturedate = initData.gnext_seniorbenefitsspecialistsignaturedate;
			this.new_remandedclaimx = initData.new_remandedclaimx;
			this.gnext_preapplicationplannedduration = initData.gnext_preapplicationplannedduration;
			this.gnext_optionsample = initData.gnext_optionsample;
			this.gnext_bypasssrbenefitsspecialistreviewdate = initData.gnext_bypasssrbenefitsspecialistreviewdate;
			this.gnext_attorneyadvisorreview = initData.gnext_attorneyadvisorreview;
			this.productserialnumber = initData.productserialnumber;
			this.new_federalappealx = initData.new_federalappealx;
			this.customersatisfactioncode = initData.customersatisfactioncode;
			this.gnext_benefitentitlement = initData.gnext_benefitentitlement;
			this.masteridname = initData.masteridname;
			this.gnext_psobportaluseridyominame = initData.gnext_psobportaluseridyominame;
			this.gnext_ocfofaadstartdate = initData.gnext_ocfofaadstartdate;
			this.gnext_applicationreceived = initData.gnext_applicationreceived;
			this.gnext_econdolencesentname = initData.gnext_econdolencesentname;
			this.gnext_draftnotificationlettersdate = initData.gnext_draftnotificationlettersdate;
			this.productidname = initData.productidname;
			this.gnext_independentmedicalexaminaridyominame = initData.gnext_independentmedicalexaminaridyominame;
			this.gnext_psobbenefitsspecialistname = initData.gnext_psobbenefitsspecialistname;
			this.gnext_applicationstartedflagname = initData.gnext_applicationstartedflagname;
			this.gnext_addressconfirmationname = initData.gnext_addressconfirmationname;
			this.gnext_seniorbenefitsspecialistreviewcompleted = initData.gnext_seniorbenefitsspecialistreviewcompleted;
			this.gnext_withdrawalrequestreceivedname = initData.gnext_withdrawalrequestreceivedname;
			this.firstresponsebykpiidname = initData.firstresponsebykpiidname;
			this._subjectid_value = initData._subjectid_value;
			this.gnext_obligation3valuename = initData.gnext_obligation3valuename;
			this.gnext_seniorbenefitsspecialistsignature = initData.gnext_seniorbenefitsspecialistsignature;
			this.gnext_benefitsspecialistreviewcompletedname = initData.gnext_benefitsspecialistreviewcompletedname;
			this.gnext_bypassplcaareviewname = initData.gnext_bypassplcaareviewname;
			this.gnext_typeofofficername = initData.gnext_typeofofficername;
			this.new_durationofdeterminationprocessindaysfro = initData.new_durationofdeterminationprocessindaysfro;
			this.gnext_applicationenddate = initData.gnext_applicationenddate;
			this.slainvokedidname = initData.slainvokedidname;
			this.customercontacted = initData.customercontacted;
			this.gnext_applicationsvalidated = initData.gnext_applicationsvalidated;
			this.gnext_nonactivitywarning1name = initData.gnext_nonactivitywarning1name;
			this.gnext_applicationlinkedname = initData.gnext_applicationlinkedname;
			this.firstresponseslastatus = initData.firstresponseslastatus;
			this.new_administrativecloseoutneededforhoappeal = initData.new_administrativecloseoutneededforhoappeal;
			this.gnext_draftnotificationlettersname = initData.gnext_draftnotificationlettersname;
			this.gnext_psoblegaladvisor = initData.gnext_psoblegaladvisor;
			this.gnext_lastpsastatus = initData.gnext_lastpsastatus;
			this.new_reasonforbjadirectordenial = initData.new_reasonforbjadirectordenial;
			this.contactidyominame = initData.contactidyominame;
			this.gnext_bypasspreapplication = initData.gnext_bypasspreapplication;
			this._resolvebykpiid_value = initData._resolvebykpiid_value;
			this.gnext_psocountry = initData.gnext_psocountry;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.gnext_legalscoringcompleted = initData.gnext_legalscoringcompleted;
			this.gnext_abandonmentnotification1date = initData.gnext_abandonmentnotification1date;
			this.gnext_achformvalidated = initData.gnext_achformvalidated;
			this.gnext_imepacketcompleteddate = initData.gnext_imepacketcompleteddate;
			this.gnext_psolegaladvisorphone = initData.gnext_psolegaladvisorphone;
			this.gnext_imereviewedqcdate = initData.gnext_imereviewedqcdate;
			this.escalatedon = initData.escalatedon;
			this.primarycontactidname = initData.primarycontactidname;
			this.createdbyexternalpartyname = initData.createdbyexternalpartyname;
			this.gnext_psobdirectorreviewenddate = initData.gnext_psobdirectorreviewenddate;
			this.gnext_psobresourceyominame = initData.gnext_psobresourceyominame;
			this.new_specificissueforissuecase = initData.new_specificissueforissuecase;
			this.gnext_bypasspsobdirectorreview = initData.gnext_bypasspsobdirectorreview;
			this.gnext_filingextensionreceived = initData.gnext_filingextensionreceived;
			this.gnext_filingextensionreviewed = initData.gnext_filingextensionreviewed;
			this.gnext_bypasssrbenefitsspecialistreviewname = initData.gnext_bypasssrbenefitsspecialistreviewname;
			this.gnext_totaltimescoring = initData.gnext_totaltimescoring;
			this.new_claimscore = initData.new_claimscore;
			this.importsequencenumber = initData.importsequencenumber;
			this.merged = initData.merged;
			this.new_positiontitlespecificorexpanded = initData.new_positiontitlespecificorexpanded;
			this.gnext_applicationverifiedflag = initData.gnext_applicationverifiedflag;
			this.owneridname = initData.owneridname;
			this.new_dayspendingtodate = initData.new_dayspendingtodate;
			this.gnext_psostate = initData.gnext_psostate;
			this.new_exactdurationofbenefitsspecialistreview = initData.new_exactdurationofbenefitsspecialistreview;
			this.gnext_filingextensionresponsesent = initData.gnext_filingextensionresponsesent;
			this.createdon = initData.createdon;
			this.gnext_psobscoringcompleted = initData.gnext_psobscoringcompleted;
			this.msa_partneridname = initData.msa_partneridname;
			this.gnext_psobdirectorsignaturedate = initData.gnext_psobdirectorsignaturedate;
			this.gnext_draftingcondolencestartdate = initData.gnext_draftingcondolencestartdate;
			this.adx_createdbyusername = initData.adx_createdbyusername;
			this.gnext_employeecompensationact = initData.gnext_employeecompensationact;
			this.new_durationfromdateclaimnumberassignedtod = initData.new_durationfromdateclaimnumberassignedtod;
			this.gnext_applicationssubmitted_state = initData.gnext_applicationssubmitted_state;
			this.gnext_ocfoenddate = initData.gnext_ocfoenddate;
			this.gnext_dateofdeath = initData.gnext_dateofdeath;
			this.gnext_psovalidatedstatusname = initData.gnext_psovalidatedstatusname;
			this.gnext_benefitsspecialistreviewcompleted = initData.gnext_benefitsspecialistreviewcompleted;
			this.lastonholdtime = initData.lastonholdtime;
			this.blockedprofile = initData.blockedprofile;
			this.resolvebykpiidname = initData.resolvebykpiidname;
			this.gnext_bypassocfodate = initData.gnext_bypassocfodate;
			this.gnext_intentionaldeath = initData.gnext_intentionaldeath;
			this.gnext_notificationstartdate = initData.gnext_notificationstartdate;
			this.gnext_timesincecreation = initData.gnext_timesincecreation;
			this.gnext_withdrawalacknowledgmentlettersent = initData.gnext_withdrawalacknowledgmentlettersent;
			this.entityimage_timestamp = initData.entityimage_timestamp;
			this.gnext_dateofinjury = initData.gnext_dateofinjury;
			this.new_durationoflegalreviewprocessatpsoboffi = initData.new_durationoflegalreviewprocessatpsoboffi;
			this.new_hearingofficerhoappealx = initData.new_hearingofficerhoappealx;
			this.gnext_socialsecuritynumber = initData.gnext_socialsecuritynumber;
			this.gnext_followuprequesteddate = initData.gnext_followuprequesteddate;
			this.gnext_lastname = initData.gnext_lastname;
			this.gnext_notificationenddate = initData.gnext_notificationenddate;
			this.msa_partnercontactidyominame = initData.msa_partnercontactidyominame;
			this.gnext_applicationsvalidated_state = initData.gnext_applicationsvalidated_state;
			this.customeridname = initData.customeridname;
			this.gnext_sendnotificationlettersname = initData.gnext_sendnotificationlettersname;
			this.gnext_accessingclaimdatecompleted = initData.gnext_accessingclaimdatecompleted;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.gnext_lastchildentityupdateddate = initData.gnext_lastchildentityupdateddate;
			this.new_hearingdate = initData.new_hearingdate;
			this.gnext_firstname = initData.gnext_firstname;
			this._ownerid_value = initData._ownerid_value;
			this.followuptaskcreated = initData.followuptaskcreated;
			this.gnext_applicationsubmittedflagname = initData.gnext_applicationsubmittedflagname;
			this.gnext_inserviceof = initData.gnext_inserviceof;
			this.new_911column3awardedvcf1benefitx = initData.new_911column3awardedvcf1benefitx;
			this.gnext_officernamesuffix = initData.gnext_officernamesuffix;
			this.gnext_totalactualstagedurations = initData.gnext_totalactualstagedurations;
			this.new_datacontrolnumberdcnyregdocnumber = initData.new_datacontrolnumberdcnyregdocnumber;
			this.billedserviceunits = initData.billedserviceunits;
			this.versionnumber = initData.versionnumber;
			this.gnext_seniorbenefitsspecialistreviewenddate = initData.gnext_seniorbenefitsspecialistreviewenddate;
			this.gnext_applicationsunsubmitted = initData.gnext_applicationsunsubmitted;
			this.gnext_addressconfirmationdate = initData.gnext_addressconfirmationdate;
			this.gnext_reviewnotificationletters = initData.gnext_reviewnotificationletters;
			this.new_assignedlegaladvisorla = initData.new_assignedlegaladvisorla;
			this.actualserviceunits = initData.actualserviceunits;
			this.gnext_srbenefitsspecialist = initData.gnext_srbenefitsspecialist;
			this.gnext_lastpsastatusname = initData.gnext_lastpsastatusname;
			this.gnext_applicationsubmittedflag = initData.gnext_applicationsubmittedflag;
			this.messagetypecode = initData.messagetypecode;
			this.gnext_psorecordonspecialholdname = initData.gnext_psorecordonspecialholdname;
			this.gnext_precommitment = initData.gnext_precommitment;
			this.gnext_decommittedname = initData.gnext_decommittedname;
			this.exchangerate = initData.exchangerate;
			this.gnext_benefitsawarded = initData.gnext_benefitsawarded;
			this.gnext_dcretirementdisability = initData.gnext_dcretirementdisability;
			this.gnext_plcaasignaturename = initData.gnext_plcaasignaturename;
			this.followupby = initData.followupby;
			this.gnext_internalclosurestatus = initData.gnext_internalclosurestatus;
			this.accountidyominame = initData.accountidyominame;
			this.gnext_collaborationdate = initData.gnext_collaborationdate;
			this.gnext_draftdeterminationcompleteddate = initData.gnext_draftdeterminationcompleteddate;
			this.gnext_applicationsunsubmitted_date = initData.gnext_applicationsunsubmitted_date;
			this.gnext_stopclaimtimersname = initData.gnext_stopclaimtimersname;
			this.gnext_mailingcompletingclaimdatecompleted = initData.gnext_mailingcompletingclaimdatecompleted;
			this.gnext_psovalidatedstatus = initData.gnext_psovalidatedstatus;
			this.createdbyyominame = initData.createdbyyominame;
			this.new_dateofincidentdeathordisability = initData.new_dateofincidentdeathordisability;
			this.gnext_applicationsvalidated_date = initData.gnext_applicationsvalidated_date;
			this.gnext_bypassocfoname = initData.gnext_bypassocfoname;
			this.gnext_psorecordonhold = initData.gnext_psorecordonhold;
			this.new_bjadirectorappealoutcomeadorpending = initData.new_bjadirectorappealoutcomeadorpending;
			this.gnext_psobresourcecenter2name = initData.gnext_psobresourcecenter2name;
			this.gnext_totaltimeplcaareview = initData.gnext_totaltimeplcaareview;
			this.gnext_followupreceived = initData.gnext_followupreceived;
			this.new_durationofoutreachindaysfromoutreachas = initData.new_durationofoutreachindaysfromoutreachas;
			this.gnext_applicationpartb_date = initData.gnext_applicationpartb_date;
			this.gnext_performinglegalreviewdatecompleted = initData.gnext_performinglegalreviewdatecompleted;
			this.adx_modifiedbyipaddress = initData.adx_modifiedbyipaddress;
			this.gnext_filingextensionresponsesentname = initData.gnext_filingextensionresponsesentname;
			this.gnext_sendnotificationletters = initData.gnext_sendnotificationletters;
			this._accountid_value = initData._accountid_value;
			this.gnext_plcaasignature = initData.gnext_plcaasignature;
			this.kbarticleidname = initData.kbarticleidname;
			this.gnext_draftingecondolencedate = initData.gnext_draftingecondolencedate;
			this.gnext_precommitmentdate = initData.gnext_precommitmentdate;
			this.gnext_imepacketsentdate = initData.gnext_imepacketsentdate;
			this.gnext_totaltimelegalreview = initData.gnext_totaltimelegalreview;
			this.gnext_totaltimeapplication = initData.gnext_totaltimeapplication;
			this.gnext_publicsafetyagencyidname = initData.gnext_publicsafetyagencyidname;
			this.gnext_abandonmentletterrevieweddate = initData.gnext_abandonmentletterrevieweddate;
			this.gnext_srbenefitsspecialistname = initData.gnext_srbenefitsspecialistname;
			this._slainvokedid_value = initData._slainvokedid_value;
			this.accountidname = initData.accountidname;
			this.gnext_legaladvisorreview = initData.gnext_legaladvisorreview;
			this.gnext_dateofbirth = initData.gnext_dateofbirth;
			this.gnext_psorecordnumberassigneddate = initData.gnext_psorecordnumberassigneddate;
			this.gnext_totaltimeocfofaad = initData.gnext_totaltimeocfofaad;
			this.new_911column2relatedpsoeaclaims = initData.new_911column2relatedpsoeaclaims;
			this.new_causeofdeathcod = initData.new_causeofdeathcod;
			this.gnext_nulldatefield = initData.gnext_nulldatefield;
			this.gnext_psobresourcename = initData.gnext_psobresourcename;
			this.gnext_optionsamplename = initData.gnext_optionsamplename;
			this.gnext_notificationfinalenddate = initData.gnext_notificationfinalenddate;
			this.gnext_legalreviewplannedduration = initData.gnext_legalreviewplannedduration;
			this.gnext_prefix = initData.gnext_prefix;
			this._primarycontactid_value = initData._primarycontactid_value;
			this.gnext_reviewnotificationlettersname = initData.gnext_reviewnotificationlettersname;
			this.new_agency = initData.new_agency;
			this.gnext_draftingdeterminationdatecompleted = initData.gnext_draftingdeterminationdatecompleted;
			this.adx_supportplanname = initData.adx_supportplanname;
			this.gnext_applicationssubmitted_date = initData.gnext_applicationssubmitted_date;
			this.new_psobofficedeterminationx = initData.new_psobofficedeterminationx;
			this.gnext_factualcomplexity = initData.gnext_factualcomplexity;
			this.gnext_commitment = initData.gnext_commitment;
			this.gnext_plcaasignaturedate = initData.gnext_plcaasignaturedate;
			this.gnext_abandonmentletterdrafteddate = initData.gnext_abandonmentletterdrafteddate;
			this.customeridyominame = initData.customeridyominame;
			this.gnext_claimassessmentplannedduration = initData.gnext_claimassessmentplannedduration;
			this.firstresponsesent = initData.firstresponsesent;
			this.createdbyexternalparty = initData.createdbyexternalparty;
			this.gnext_buildingapplicationstartdate = initData.gnext_buildingapplicationstartdate;
			this.statuscode = initData.statuscode;
			this.gnext_performinglegalreviewstartdate = initData.gnext_performinglegalreviewstartdate;
			this.gnext_seniorbenefitsspecialistreviewstartdate = initData.gnext_seniorbenefitsspecialistreviewstartdate;
			this.gnext_imereceiveddate = initData.gnext_imereceiveddate;
			this.entityimage_url = initData.entityimage_url;
			this.gnext_psoaddress3 = initData.gnext_psoaddress3;
			this.adx_resolutiondate = initData.adx_resolutiondate;
			this.createdbyname = initData.createdbyname;
			this._contractdetailid_value = initData._contractdetailid_value;
			this.subjectidname = initData.subjectidname;
			this.new_durationofhearingofficerappealprocessin = initData.new_durationofhearingofficerappealprocessin;
			this.gnext_imepacketpreparationstartdate = initData.gnext_imepacketpreparationstartdate;
			this.new_issuecasesclaimsonholdbefore52013tra = initData.new_issuecasesclaimsonholdbefore52013tra;
			this.gnext_currentdatetime = initData.gnext_currentdatetime;
			this.firstresponseslastatusname = initData.firstresponseslastatusname;
			this.routecase = initData.routecase;
			this.gnext_commitment3valuename = initData.gnext_commitment3valuename;
			this.gnext_socialsecuritynumberprefix = initData.gnext_socialsecuritynumberprefix;
			this.gnext_withdrawalacknowledgmentlettersentname = initData.gnext_withdrawalacknowledgmentlettersentname;
			this.adx_supportrequestname = initData.adx_supportrequestname;
			this.gnext_totaltimenotification = initData.gnext_totaltimenotification;
			this.gnext_followupreceiveddate = initData.gnext_followupreceiveddate;
			this.gnext_psobbenefitsspecialist = initData.gnext_psobbenefitsspecialist;
			this.gnext_notificationfinalplannedduration = initData.gnext_notificationfinalplannedduration;
			this.gnext_legaladvisorreviewname = initData.gnext_legaladvisorreviewname;
			this.gnext_paymentmade = initData.gnext_paymentmade;
			this.gnext_reviewingapplicationdatecompleted = initData.gnext_reviewingapplicationdatecompleted;
			this.gnext_scoringclaimdatecompleted = initData.gnext_scoringclaimdatecompleted;
			this.gnext_relatedpsorecordsidname = initData.gnext_relatedpsorecordsidname;
			this.new_reasonforhodenial = initData.new_reasonforhodenial;
			this.gnext_markcaseasclosed = initData.gnext_markcaseasclosed;
			this.gnext_psoemployedatthetimename = initData.gnext_psoemployedatthetimename;
			this.primarycontactidyominame = initData.primarycontactidyominame;
			this.gnext_psobresource = initData.gnext_psobresource;
			this.gnext_achformreceiveddate = initData.gnext_achformreceiveddate;
			this.gnext_intentionalmisconductname = initData.gnext_intentionalmisconductname;
			this.gnext_psofullname = initData.gnext_psofullname;
			this.gnext_lastprocessname = initData.gnext_lastprocessname;
			this.gnext_appealshold = initData.gnext_appealshold;
			this.gnext_paymentmadedate = initData.gnext_paymentmadedate;
			this.gnext_psaapplicationsubmittedname = initData.gnext_psaapplicationsubmittedname;
			this.gnext_plcaareviewstartdate = initData.gnext_plcaareviewstartdate;
			this.owningbusinessunit = initData.owningbusinessunit;
			this._gnext_psobportaluserid_value = initData._gnext_psobportaluserid_value;
			this.contractidname = initData.contractidname;
			this.checkemailname = initData.checkemailname;
			this.gnext_psaapplicationsubmitted = initData.gnext_psaapplicationsubmitted;
			this.gnext_colorcode = initData.gnext_colorcode;
			this.gnext_preabandonmentreviewedname = initData.gnext_preabandonmentreviewedname;
			this.gnext_psobdirectorsignature = initData.gnext_psobdirectorsignature;
			this.gnext_legaladvisorreviewdate = initData.gnext_legaladvisorreviewdate;
			this.gnext_draftingecondolence = initData.gnext_draftingecondolence;
			this._entityimageid_value = initData._entityimageid_value;
			this.gnext_psorecordonholdname = initData.gnext_psorecordonholdname;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.gnext_imereceiptstartdate = initData.gnext_imereceiptstartdate;
			this.gnext_plcaareviewenddate = initData.gnext_plcaareviewenddate;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.gnext_imereceiptdatecompleted = initData.gnext_imereceiptdatecompleted;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.modifiedbyname = initData.modifiedbyname;
			this.gnext_paymentmadename = initData.gnext_paymentmadename;
			this._transactioncurrencyid_value = initData._transactioncurrencyid_value;
			this.customersatisfactioncodename = initData.customersatisfactioncodename;
			this.statecode = initData.statecode;
			this.gnext_seniorbenefitsspecialistsignaturename = initData.gnext_seniorbenefitsspecialistsignaturename;
			this.new_datehodeterminationsigned = initData.new_datehodeterminationsigned;
			this.gnext_efficiency = initData.gnext_efficiency;
			this.adx_modifiedbyusername = initData.adx_modifiedbyusername;
			this.isescalatedname = initData.isescalatedname;
			this.new_dateofnoticeofhoappeal = initData.new_dateofnoticeofhoappeal;
			this._entitlementid_value = initData._entitlementid_value;
			this._parentcaseid_value = initData._parentcaseid_value;
			this.gnext_notification2 = initData.gnext_notification2;
			this.gnext_applicationpartblookup = initData.gnext_applicationpartblookup;
			this.gnext_publicsafetyagencyidyominame = initData.gnext_publicsafetyagencyidyominame;
			this.new_bjadirectorappealx = initData.new_bjadirectorappealx;
			this.gnext_applicationplannedduration = initData.gnext_applicationplannedduration;
			this.gnext_applicationpartb = initData.gnext_applicationpartb;
			this.gnext_activeyregnumber = initData.gnext_activeyregnumber;
			this.gnext_achformvalidateddate = initData.gnext_achformvalidateddate;
			this.new_specificcauseofdeathfromdeathcertificat = initData.new_specificcauseofdeathfromdeathcertificat;
			this.gnext_followuprequestedname = initData.gnext_followuprequestedname;
			this.gnext_reviewnotificationlettersdate = initData.gnext_reviewnotificationlettersdate;
			this.gnext_bypassnotificationname = initData.gnext_bypassnotificationname;
			this.gnext_applicationreceivedname = initData.gnext_applicationreceivedname;
			this.isdecrementingname = initData.isdecrementingname;
			this.gnext_intentionaldeathname = initData.gnext_intentionaldeathname;
			this.gnext_bypassapplicationname = initData.gnext_bypassapplicationname;
			this.servicestagename = initData.servicestagename;
			this.gnext_totaltimepsobdirectorreview = initData.gnext_totaltimepsobdirectorreview;
			this.followuptaskcreatedname = initData.followuptaskcreatedname;
			this.gnext_buildingapplicationdatecompleted = initData.gnext_buildingapplicationdatecompleted;
			this.gnext_noticeofobligationtoocfoname = initData.gnext_noticeofobligationtoocfoname;
			this.gnext_bypassplcaareviewdate = initData.gnext_bypassplcaareviewdate;
			this.new_datesenttobudget = initData.new_datesenttobudget;
			this.new_durationofentireclaimsprocessindaysfro = initData.new_durationofentireclaimsprocessindaysfro;
			this.gnext_legalreviewstartdate = initData.gnext_legalreviewstartdate;
			this.isdecrementing = initData.isdecrementing;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.new_durationofbenefitsspecialistreviewinday = initData.new_durationofbenefitsspecialistreviewinday;
			this.adx_supportrequest = initData.adx_supportrequest;
			this._processid_value = initData._processid_value;
			this.gnext_psobdirectorreview = initData.gnext_psobdirectorreview;
			this.gnext_preabandonmentreviewed = initData.gnext_preabandonmentreviewed;
			this.gnext_precommitmentname = initData.gnext_precommitmentname;
			this.gnext_preabandonmentdraftedname = initData.gnext_preabandonmentdraftedname;
			this.gnext_imeselectiondatecompleted = initData.gnext_imeselectiondatecompleted;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.description = initData.description;
			this.gnext_benefitsspecialistassigned = initData.gnext_benefitsspecialistassigned;
			this.gnext_noticeofobligationtoocfodate = initData.gnext_noticeofobligationtoocfodate;
			this.gnext_typeofofficer = initData.gnext_typeofofficer;
			this.gnext_claimclassificationstartdate = initData.gnext_claimclassificationstartdate;
			this.gnext_independentmedicalexaminaridname = initData.gnext_independentmedicalexaminaridname;
			this.gnext_causeofdeath = initData.gnext_causeofdeath;
			this.new_inactivestatuswave1outreachletterx = initData.new_inactivestatuswave1outreachletterx;
			this.gnext_internalclaimstage = initData.gnext_internalclaimstage;
			this.gnext_attorneyadvisorreviewdate = initData.gnext_attorneyadvisorreviewdate;
			this.gnext_bypassscoringname = initData.gnext_bypassscoringname;
			this.gnext_applicationpartb_state = initData.gnext_applicationpartb_state;
			this.gnext_applicationpartblookupname = initData.gnext_applicationpartblookupname;
			this.gnext_draftingdeterminationstartdate = initData.gnext_draftingdeterminationstartdate;
			this.gnext_draftdeterminationcompleted = initData.gnext_draftdeterminationcompleted;
			this.statecodename = initData.statecodename;
			this.gnext_claimclassificationplannedduration = initData.gnext_claimclassificationplannedduration;
			this.gnext_legaladvisorassigned = initData.gnext_legaladvisorassigned;
			this.gnext_ocfo = initData.gnext_ocfo;
			this.decremententitlementtermname = initData.decremententitlementtermname;
			this._socialprofileid_value = initData._socialprofileid_value;
			this._firstresponsebykpiid_value = initData._firstresponsebykpiid_value;
			this.gnext_applicationlinked = initData.gnext_applicationlinked;
			this.gnext_officerstitle = initData.gnext_officerstitle;
			this.gnext_aggregatescorecompiled = initData.gnext_aggregatescorecompiled;
			this.gnext_totaldaysclaimopen = initData.gnext_totaldaysclaimopen;
			this.gnext_sendnotificationlettersdate = initData.gnext_sendnotificationlettersdate;
			this.gnext_intentionalmisconduct = initData.gnext_intentionalmisconduct;
			this.gnext_legalscoringcompletedname = initData.gnext_legalscoringcompletedname;
			this.gnext_filingextensionreviewedname = initData.gnext_filingextensionreviewedname;
			this.gnext_voluntaryintoxicationname = initData.gnext_voluntaryintoxicationname;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.resolveby = initData.resolveby;
			this.gnext_middlename = initData.gnext_middlename;
			this.gnext_applicationreviewedtimelyname = initData.gnext_applicationreviewedtimelyname;
			this.gnext_abandonmentlettersentdate = initData.gnext_abandonmentlettersentdate;
			this.gnext_benefitentitlementexplanation = initData.gnext_benefitentitlementexplanation;
			this.gnext_achformvalidatedname = initData.gnext_achformvalidatedname;
			this.owningteam = initData.owningteam;
			this.messagetypecodename = initData.messagetypecodename;
			this.caseorigincode = initData.caseorigincode;
			this.gnext_bypasspreapplcationdate = initData.gnext_bypasspreapplcationdate;
			this.gnext_psobdirectorsignaturename = initData.gnext_psobdirectorsignaturename;
			this.gnext_claimassessmentstartdate = initData.gnext_claimassessmentstartdate;
			this.adx_publishtowebname = initData.adx_publishtowebname;
			this.new_hometownheroeshhdlax = initData.new_hometownheroeshhdlax;
			this.gnext_bypasscustomerrescourcespecialistreviewda = initData.gnext_bypasscustomerrescourcespecialistreviewda;
			this.casetypecode = initData.casetypecode;
			this.traversedpath = initData.traversedpath;
			this._contactid_value = initData._contactid_value;
			this.new_claimantsattorneyrepresentative = initData.new_claimantsattorneyrepresentative;
			this.contractservicelevelcode = initData.contractservicelevelcode;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.new_dateofoutreachassignment = initData.new_dateofoutreachassignment;
			this.gnext_claimassessmentenddate = initData.gnext_claimassessmentenddate;
			this.gnext_finalizingdeterminationstartdate = initData.gnext_finalizingdeterminationstartdate;
			this.gnext_voluntaryintoxication = initData.gnext_voluntaryintoxication;
			this.gnext_benefitsspecialistassignedname = initData.gnext_benefitsspecialistassignedname;
			this.gnext_preapplicationtotaltime = initData.gnext_preapplicationtotaltime;
			this.gnext_psobportaluseridname = initData.gnext_psobportaluseridname;
			this.gnext_claimsummaryformcompleted = initData.gnext_claimsummaryformcompleted;
			this.gnext_psobdirectorreviewname = initData.gnext_psobdirectorreviewname;
			this._customerid_value = initData._customerid_value;
			this.isescalated = initData.isescalated;
			this.gnext_followupreceivedname = initData.gnext_followupreceivedname;
			this._contractid_value = initData._contractid_value;
			this.modifiedby = initData.modifiedby;
			this.new_reasonforpsobdenial = initData.new_reasonforpsobdenial;
			this.msa_partnercontactidname = initData.msa_partnercontactidname;
			this.gnext_applicationssubmitted = initData.gnext_applicationssubmitted;
			this.resolvebyslastatus = initData.resolvebyslastatus;
			this.gnext_psostateidname = initData.gnext_psostateidname;
			this.gnext_benefitsspecialistsignaturename = initData.gnext_benefitsspecialistsignaturename;
			this.gnext_psobdirectorreviewplannedduration = initData.gnext_psobdirectorreviewplannedduration;
			this.gnext_claimclassificationenddate = initData.gnext_claimclassificationenddate;
			this.gnext_achformreceived = initData.gnext_achformreceived;
			this.gnext_employmentstatus = initData.gnext_employmentstatus;
			this.gnext_accessingclaimstartdate = initData.gnext_accessingclaimstartdate;
			this.gnext_totaltimebenefitsspecialistreview = initData.gnext_totaltimebenefitsspecialistreview;
			this.gnext_imerequestsentdate = initData.gnext_imerequestsentdate;
			this._kbarticleid_value = initData._kbarticleid_value;
			this.new_administrativecloseoutneeded = initData.new_administrativecloseoutneeded;
			this.severitycode = initData.severitycode;
			this.gnext_customerresourcecenterplannedduration = initData.gnext_customerresourcecenterplannedduration;
			this.decremententitlementterm = initData.decremententitlementterm;
			this.gnext_seniorbenefitsspecialistreviewcompletedname = initData.gnext_seniorbenefitsspecialistreviewcompletedname;
			this.new_dateofnoticeofintenttodeemclaimabando = initData.new_dateofnoticeofintenttodeemclaimabando;
			this.new_durationofbjadirectorappealprocessinda = initData.new_durationofbjadirectorappealprocessinda;
			this.gnext_psostatename = initData.gnext_psostatename;
			this.gnext_activeyregnumbername = initData.gnext_activeyregnumbername;
			this.gnext_psotitle = initData.gnext_psotitle;
			this.createdbyexternalpartyyominame = initData.createdbyexternalpartyyominame;
			this.onholdtime = initData.onholdtime;
			this.msa_partneridyominame = initData.msa_partneridyominame;
			this.gnext_bypassbenefitsspecialistreviewdate = initData.gnext_bypassbenefitsspecialistreviewdate;
			this.gnext_causeofdeathname = initData.gnext_causeofdeathname;
			this.ticketnumber = initData.ticketnumber;
			this.entityimage = initData.entityimage;
			this.gnext_commitmentname = initData.gnext_commitmentname;
			this.gnext_psobresourcecenter2 = initData.gnext_psobresourcecenter2;
			this.influencescore = initData.influencescore;
			this.gnext_bypassocfofaaddate = initData.gnext_bypassocfofaaddate;
			this.overriddencreatedon = initData.overriddencreatedon;
			
            this.id = initData.incidentid;
        }
    }
	
    /** @description Collection interface for Task
     */  
	export interface ITasks extends IRetrieveMultipleData<ITask> { }
    /** @description WebAPI interface for Task
     */  
    export interface ITask {
        [key: string]: string | number
        isbilled?: string
		prioritycodename?: number
		versionnumber?: number
		createdon?: string
		statuscodename?: number
		traversedpath?: string
		isworkflowcreated?: string
		modifiedbyyominame?: string
		owneridtype?: string
		crmtaskassigneduniqueid?: string
		createdonbehalfby?: string
		modifiedbyname?: string
		onholdtime?: number
		regardingobjectidyominame?: string
		owneridname?: string
		prioritycode?: string
		overriddencreatedon?: string
		scheduledstart?: string
		actualstart?: string
		createdonbehalfbyyominame?: string
		_subscriptionid_value?: string
		modifiedonbehalfby?: string
		exchangerate?: number
		gnext_starttimerdatetime?: string
		subcategory?: string
		_regardingobjectid_value?: string
		statecode?: number
		timezoneruleversionnumber?: number
		gnext_groupaggregatecategoryname?: number
		activitytypecodename?: number
		regardingobjectidname?: string
		activityadditionalparams?: string
		createdonbehalfbyname?: string
		activitytypecode?: string
		isbilledname?: number
		utcconversiontimezonecode?: number
		_slaid_value?: string
		_ownerid_value?: string
		isregularactivityname?: number
		importsequencenumber?: number
		owneridyominame?: string
		scheduleddurationminutes?: number
		category?: string
		_processid_value?: string
		description?: string
		slaname?: string
		gnext_starttimer?: string
		createdbyname?: string
		gnext_groupaggregatecategory?: string
		owningteam?: string
		sortdate?: string
		isworkflowcreatedname?: number
		lastonholdtime?: string
		_stageid_value?: string
		modifiedon?: string
		_transactioncurrencyid_value?: string
		_slainvokedid_value?: string
		createdby?: string
		modifiedby?: string
		_serviceid_value?: string
		percentcomplete?: number
		createdbyyominame?: string
		owninguser?: string
		transactioncurrencyidname?: string
		actualend?: string
		owningbusinessunit?: string
		gnext_calculatedduration?: number
		activityid?: string
		isregularactivity?: string
		modifiedonbehalfbyname?: string
		gnext_starttimername?: number
		slainvokedidname?: string
		scheduledend?: string
		statuscode?: string
		modifiedonbehalfbyyominame?: string
		statecodename?: number
		actualdurationminutes?: number
		subject?: string
		regardingobjecttypecode?: string
		
    }
    /** @description Form Helper Class for Task
     */ 
	export class TaskForm {
		public isbilled: string = "isbilled";
		public prioritycodename: string = "prioritycodename";
		public versionnumber: string = "versionnumber";
		public createdon: string = "createdon";
		public statuscodename: string = "statuscodename";
		public traversedpath: string = "traversedpath";
		public isworkflowcreated: string = "isworkflowcreated";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public owneridtype: string = "owneridtype";
		public crmtaskassigneduniqueid: string = "crmtaskassigneduniqueid";
		public createdonbehalfby: string = "createdonbehalfby";
		public modifiedbyname: string = "modifiedbyname";
		public onholdtime: string = "onholdtime";
		public regardingobjectidyominame: string = "regardingobjectidyominame";
		public owneridname: string = "owneridname";
		public prioritycode: string = "prioritycode";
		public overriddencreatedon: string = "overriddencreatedon";
		public scheduledstart: string = "scheduledstart";
		public actualstart: string = "actualstart";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public subscriptionid: string = "subscriptionid";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public exchangerate: string = "exchangerate";
		public gnext_starttimerdatetime: string = "gnext_starttimerdatetime";
		public subcategory: string = "subcategory";
		public regardingobjectid: string = "regardingobjectid";
		public statecode: string = "statecode";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_groupaggregatecategoryname: string = "gnext_groupaggregatecategoryname";
		public activitytypecodename: string = "activitytypecodename";
		public regardingobjectidname: string = "regardingobjectidname";
		public activityadditionalparams: string = "activityadditionalparams";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public activitytypecode: string = "activitytypecode";
		public isbilledname: string = "isbilledname";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public slaid: string = "slaid";
		public ownerid: string = "ownerid";
		public isregularactivityname: string = "isregularactivityname";
		public importsequencenumber: string = "importsequencenumber";
		public owneridyominame: string = "owneridyominame";
		public scheduleddurationminutes: string = "scheduleddurationminutes";
		public category: string = "category";
		public processid: string = "processid";
		public description: string = "description";
		public slaname: string = "slaname";
		public gnext_starttimer: string = "gnext_starttimer";
		public createdbyname: string = "createdbyname";
		public gnext_groupaggregatecategory: string = "gnext_groupaggregatecategory";
		public owningteam: string = "owningteam";
		public sortdate: string = "sortdate";
		public isworkflowcreatedname: string = "isworkflowcreatedname";
		public lastonholdtime: string = "lastonholdtime";
		public stageid: string = "stageid";
		public modifiedon: string = "modifiedon";
		public transactioncurrencyid: string = "transactioncurrencyid";
		public slainvokedid: string = "slainvokedid";
		public createdby: string = "createdby";
		public modifiedby: string = "modifiedby";
		public serviceid: string = "serviceid";
		public percentcomplete: string = "percentcomplete";
		public createdbyyominame: string = "createdbyyominame";
		public owninguser: string = "owninguser";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public actualend: string = "actualend";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_calculatedduration: string = "gnext_calculatedduration";
		public activityid: string = "activityid";
		public isregularactivity: string = "isregularactivity";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public gnext_starttimername: string = "gnext_starttimername";
		public slainvokedidname: string = "slainvokedidname";
		public scheduledend: string = "scheduledend";
		public statuscode: string = "statuscode";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public statecodename: string = "statecodename";
		public actualdurationminutes: string = "actualdurationminutes";
		public subject: string = "subject";
		public regardingobjecttypecode: string = "regardingobjecttypecode";
		
	}
    /** @description Web API attribute string helper class for Task
     */ 
    export class TaskWebAPI {
        public isbilled: string = "isbilled";
		public prioritycodename: string = "prioritycodename";
		public versionnumber: string = "versionnumber";
		public createdon: string = "createdon";
		public statuscodename: string = "statuscodename";
		public traversedpath: string = "traversedpath";
		public isworkflowcreated: string = "isworkflowcreated";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public owneridtype: string = "owneridtype";
		public crmtaskassigneduniqueid: string = "crmtaskassigneduniqueid";
		public createdonbehalfby: string = "createdonbehalfby";
		public modifiedbyname: string = "modifiedbyname";
		public onholdtime: string = "onholdtime";
		public regardingobjectidyominame: string = "regardingobjectidyominame";
		public owneridname: string = "owneridname";
		public prioritycode: string = "prioritycode";
		public overriddencreatedon: string = "overriddencreatedon";
		public scheduledstart: string = "scheduledstart";
		public actualstart: string = "actualstart";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public _subscriptionid_value: string = "_subscriptionid_value";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public exchangerate: string = "exchangerate";
		public gnext_starttimerdatetime: string = "gnext_starttimerdatetime";
		public subcategory: string = "subcategory";
		public _regardingobjectid_value: string = "_regardingobjectid_value";
		public statecode: string = "statecode";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public gnext_groupaggregatecategoryname: string = "gnext_groupaggregatecategoryname";
		public activitytypecodename: string = "activitytypecodename";
		public regardingobjectidname: string = "regardingobjectidname";
		public activityadditionalparams: string = "activityadditionalparams";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public activitytypecode: string = "activitytypecode";
		public isbilledname: string = "isbilledname";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public _slaid_value: string = "_slaid_value";
		public _ownerid_value: string = "_ownerid_value";
		public isregularactivityname: string = "isregularactivityname";
		public importsequencenumber: string = "importsequencenumber";
		public owneridyominame: string = "owneridyominame";
		public scheduleddurationminutes: string = "scheduleddurationminutes";
		public category: string = "category";
		public _processid_value: string = "_processid_value";
		public description: string = "description";
		public slaname: string = "slaname";
		public gnext_starttimer: string = "gnext_starttimer";
		public createdbyname: string = "createdbyname";
		public gnext_groupaggregatecategory: string = "gnext_groupaggregatecategory";
		public owningteam: string = "owningteam";
		public sortdate: string = "sortdate";
		public isworkflowcreatedname: string = "isworkflowcreatedname";
		public lastonholdtime: string = "lastonholdtime";
		public _stageid_value: string = "_stageid_value";
		public modifiedon: string = "modifiedon";
		public _transactioncurrencyid_value: string = "_transactioncurrencyid_value";
		public _slainvokedid_value: string = "_slainvokedid_value";
		public createdby: string = "createdby";
		public modifiedby: string = "modifiedby";
		public _serviceid_value: string = "_serviceid_value";
		public percentcomplete: string = "percentcomplete";
		public createdbyyominame: string = "createdbyyominame";
		public owninguser: string = "owninguser";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public actualend: string = "actualend";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_calculatedduration: string = "gnext_calculatedduration";
		public activityid: string = "activityid";
		public isregularactivity: string = "isregularactivity";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public gnext_starttimername: string = "gnext_starttimername";
		public slainvokedidname: string = "slainvokedidname";
		public scheduledend: string = "scheduledend";
		public statuscode: string = "statuscode";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public statecodename: string = "statecodename";
		public actualdurationminutes: string = "actualdurationminutes";
		public subject: string = "subject";
		public regardingobjecttypecode: string = "regardingobjecttypecode";
			
    }
    /** @description Instantiates a Task Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class Task extends Entity {
		[key: string]: string | number
        public route: string = "tasks";
		public isbilled: string;
		public prioritycodename: number;
		public versionnumber: number;
		public createdon: string;
		public statuscodename: number;
		public traversedpath: string;
		public isworkflowcreated: string;
		public modifiedbyyominame: string;
		public owneridtype: string;
		public crmtaskassigneduniqueid: string;
		public createdonbehalfby: string;
		public modifiedbyname: string;
		public onholdtime: number;
		public regardingobjectidyominame: string;
		public owneridname: string;
		public prioritycode: string;
		public overriddencreatedon: string;
		public scheduledstart: string;
		public actualstart: string;
		public createdonbehalfbyyominame: string;
		public _subscriptionid_value: string;
		public modifiedonbehalfby: string;
		public exchangerate: number;
		public gnext_starttimerdatetime: string;
		public subcategory: string;
		public _regardingobjectid_value: string;
		public statecode: number;
		public timezoneruleversionnumber: number;
		public gnext_groupaggregatecategoryname: number;
		public activitytypecodename: number;
		public regardingobjectidname: string;
		public activityadditionalparams: string;
		public createdonbehalfbyname: string;
		public activitytypecode: string;
		public isbilledname: number;
		public utcconversiontimezonecode: number;
		public _slaid_value: string;
		public _ownerid_value: string;
		public isregularactivityname: number;
		public importsequencenumber: number;
		public owneridyominame: string;
		public scheduleddurationminutes: number;
		public category: string;
		public _processid_value: string;
		public description: string;
		public slaname: string;
		public gnext_starttimer: string;
		public createdbyname: string;
		public gnext_groupaggregatecategory: string;
		public owningteam: string;
		public sortdate: string;
		public isworkflowcreatedname: number;
		public lastonholdtime: string;
		public _stageid_value: string;
		public modifiedon: string;
		public _transactioncurrencyid_value: string;
		public _slainvokedid_value: string;
		public createdby: string;
		public modifiedby: string;
		public _serviceid_value: string;
		public percentcomplete: number;
		public createdbyyominame: string;
		public owninguser: string;
		public transactioncurrencyidname: string;
		public actualend: string;
		public owningbusinessunit: string;
		public gnext_calculatedduration: number;
		public activityid: string;
		public isregularactivity: string;
		public modifiedonbehalfbyname: string;
		public gnext_starttimername: number;
		public slainvokedidname: string;
		public scheduledend: string;
		public statuscode: string;
		public modifiedonbehalfbyyominame: string;
		public statecodename: number;
		public actualdurationminutes: number;
		public subject: string;
		public regardingobjecttypecode: string;
			
        
        constructor(initData?: ITask) {
			super("tasks");        
            if (initData == undefined) return;
			this.isbilled = initData.isbilled;
			this.prioritycodename = initData.prioritycodename;
			this.versionnumber = initData.versionnumber;
			this.createdon = initData.createdon;
			this.statuscodename = initData.statuscodename;
			this.traversedpath = initData.traversedpath;
			this.isworkflowcreated = initData.isworkflowcreated;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.owneridtype = initData.owneridtype;
			this.crmtaskassigneduniqueid = initData.crmtaskassigneduniqueid;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.modifiedbyname = initData.modifiedbyname;
			this.onholdtime = initData.onholdtime;
			this.regardingobjectidyominame = initData.regardingobjectidyominame;
			this.owneridname = initData.owneridname;
			this.prioritycode = initData.prioritycode;
			this.overriddencreatedon = initData.overriddencreatedon;
			this.scheduledstart = initData.scheduledstart;
			this.actualstart = initData.actualstart;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this._subscriptionid_value = initData._subscriptionid_value;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.exchangerate = initData.exchangerate;
			this.gnext_starttimerdatetime = initData.gnext_starttimerdatetime;
			this.subcategory = initData.subcategory;
			this._regardingobjectid_value = initData._regardingobjectid_value;
			this.statecode = initData.statecode;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.gnext_groupaggregatecategoryname = initData.gnext_groupaggregatecategoryname;
			this.activitytypecodename = initData.activitytypecodename;
			this.regardingobjectidname = initData.regardingobjectidname;
			this.activityadditionalparams = initData.activityadditionalparams;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.activitytypecode = initData.activitytypecode;
			this.isbilledname = initData.isbilledname;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this._slaid_value = initData._slaid_value;
			this._ownerid_value = initData._ownerid_value;
			this.isregularactivityname = initData.isregularactivityname;
			this.importsequencenumber = initData.importsequencenumber;
			this.owneridyominame = initData.owneridyominame;
			this.scheduleddurationminutes = initData.scheduleddurationminutes;
			this.category = initData.category;
			this._processid_value = initData._processid_value;
			this.description = initData.description;
			this.slaname = initData.slaname;
			this.gnext_starttimer = initData.gnext_starttimer;
			this.createdbyname = initData.createdbyname;
			this.gnext_groupaggregatecategory = initData.gnext_groupaggregatecategory;
			this.owningteam = initData.owningteam;
			this.sortdate = initData.sortdate;
			this.isworkflowcreatedname = initData.isworkflowcreatedname;
			this.lastonholdtime = initData.lastonholdtime;
			this._stageid_value = initData._stageid_value;
			this.modifiedon = initData.modifiedon;
			this._transactioncurrencyid_value = initData._transactioncurrencyid_value;
			this._slainvokedid_value = initData._slainvokedid_value;
			this.createdby = initData.createdby;
			this.modifiedby = initData.modifiedby;
			this._serviceid_value = initData._serviceid_value;
			this.percentcomplete = initData.percentcomplete;
			this.createdbyyominame = initData.createdbyyominame;
			this.owninguser = initData.owninguser;
			this.transactioncurrencyidname = initData.transactioncurrencyidname;
			this.actualend = initData.actualend;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.gnext_calculatedduration = initData.gnext_calculatedduration;
			this.activityid = initData.activityid;
			this.isregularactivity = initData.isregularactivity;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.gnext_starttimername = initData.gnext_starttimername;
			this.slainvokedidname = initData.slainvokedidname;
			this.scheduledend = initData.scheduledend;
			this.statuscode = initData.statuscode;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.statecodename = initData.statecodename;
			this.actualdurationminutes = initData.actualdurationminutes;
			this.subject = initData.subject;
			this.regardingobjecttypecode = initData.regardingobjecttypecode;
			
            this.id = initData.activityid;
        }
    }
	
    /** @description Collection interface for Email
     */  
	export interface IEmails extends IRetrieveMultipleData<IEmail> { }
    /** @description WebAPI interface for Email
     */  
    export interface IEmail {
        [key: string]: string | number
        scheduledend?: string
		emailsendername?: string
		_slaid_value?: string
		parentactivityid?: string
		modifiedon?: string
		overriddencreatedon?: string
		statuscodename?: number
		senton?: string
		activityadditionalparams?: string
		parentactivityidname?: string
		sendersaccountobjecttypecode?: string
		transactioncurrencyidname?: string
		delayedemailsendtime?: string
		createdonbehalfby?: string
		activityid?: string
		emailsender?: string
		isworkflowcreated?: string
		_regardingobjectid_value?: string
		submittedby?: string
		owningbusinessunit?: string
		linksclickedcount?: number
		emailsenderyominame?: string
		to?: string
		activitytypecodename?: number
		notifications?: string
		isemailfollowedname?: number
		trackingtoken?: string
		statuscode?: string
		onholdtime?: number
		bcc?: string
		readreceiptrequested?: string
		statecodename?: number
		sendersaccount?: string
		lastopenedtime?: string
		attachmentcount?: number
		exchangerate?: number
		baseconversationindexhash?: number
		_conversationtrackingid_value?: string
		_sendermailboxid_value?: string
		messageiddupcheck?: string
		isbilled?: string
		prioritycodename?: number
		createdon?: string
		isworkflowcreatedname?: number
		emailreminderstatus?: string
		_templateid_value?: string
		isregularactivityname?: number
		isemailfollowed?: string
		category?: string
		replycount?: number
		actualstart?: string
		emailremindertype?: string
		owneridyominame?: string
		description?: string
		modifiedby?: string
		isregularactivity?: string
		modifiedonbehalfby?: string
		sender?: string
		sendersaccountyominame?: string
		traversedpath?: string
		isbilledname?: number
		sortdate?: string
		createdonbehalfbyname?: string
		owninguser?: string
		opencount?: number
		safedescription?: string
		owneridtype?: string
		_reminderactioncardid_value?: string
		emailreminderstatusname?: number
		isunsafe?: number
		notificationsname?: number
		sendersaccountname?: string
		owneridname?: string
		modifiedonbehalfbyname?: string
		createdonbehalfbyyominame?: string
		directioncodename?: number
		deliveryreceiptrequestedname?: number
		compressedname?: number
		owningteam?: string
		actualend?: string
		from?: string
		deliveryreceiptrequested?: string
		followemailuserpreferencename?: number
		regardingobjectidname?: string
		deliveryprioritycodename?: number
		_processid_value?: string
		_slainvokedid_value?: string
		deliveryprioritycode?: string
		_transactioncurrencyid_value?: string
		activitytypecode?: string
		postponeemailprocessinguntil?: string
		emailreminderexpirytime?: string
		emailremindertext?: string
		slainvokedidname?: string
		sendermailboxidname?: string
		readreceiptrequestedname?: number
		_ownerid_value?: string
		inreplyto?: string
		compressed?: string
		subject?: string
		conversationindex?: string
		timezoneruleversionnumber?: number
		emailtrackingid?: string
		createdbyname?: string
		emailsenderobjecttypecode?: string
		actualdurationminutes?: number
		modifiedbyyominame?: string
		lastonholdtime?: string
		modifiedonbehalfbyyominame?: string
		createdby?: string
		subcategory?: string
		templateidname?: string
		regardingobjectidyominame?: string
		_messageid_value?: string
		followemailuserpreference?: string
		prioritycode?: string
		_stageid_value?: string
		utcconversiontimezonecode?: number
		scheduleddurationminutes?: number
		attachmentopencount?: number
		importsequencenumber?: number
		regardingobjecttypecode?: string
		deliveryattempts?: number
		torecipients?: string
		versionnumber?: number
		mimetype?: string
		cc?: string
		scheduledstart?: string
		directioncode?: string
		emailremindertypename?: number
		modifiedbyname?: string
		createdbyyominame?: string
		_serviceid_value?: string
		correlationmethod?: string
		slaname?: string
		statecode?: number
		
    }
    /** @description Form Helper Class for Email
     */ 
	export class EmailForm {
		public scheduledend: string = "scheduledend";
		public emailsendername: string = "emailsendername";
		public slaid: string = "slaid";
		public parentactivityid: string = "parentactivityid";
		public modifiedon: string = "modifiedon";
		public overriddencreatedon: string = "overriddencreatedon";
		public statuscodename: string = "statuscodename";
		public senton: string = "senton";
		public activityadditionalparams: string = "activityadditionalparams";
		public parentactivityidname: string = "parentactivityidname";
		public sendersaccountobjecttypecode: string = "sendersaccountobjecttypecode";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public delayedemailsendtime: string = "delayedemailsendtime";
		public createdonbehalfby: string = "createdonbehalfby";
		public activityid: string = "activityid";
		public emailsender: string = "emailsender";
		public isworkflowcreated: string = "isworkflowcreated";
		public regardingobjectid: string = "regardingobjectid";
		public submittedby: string = "submittedby";
		public owningbusinessunit: string = "owningbusinessunit";
		public linksclickedcount: string = "linksclickedcount";
		public emailsenderyominame: string = "emailsenderyominame";
		public to: string = "to";
		public activitytypecodename: string = "activitytypecodename";
		public notifications: string = "notifications";
		public isemailfollowedname: string = "isemailfollowedname";
		public trackingtoken: string = "trackingtoken";
		public statuscode: string = "statuscode";
		public onholdtime: string = "onholdtime";
		public bcc: string = "bcc";
		public readreceiptrequested: string = "readreceiptrequested";
		public statecodename: string = "statecodename";
		public sendersaccount: string = "sendersaccount";
		public lastopenedtime: string = "lastopenedtime";
		public attachmentcount: string = "attachmentcount";
		public exchangerate: string = "exchangerate";
		public baseconversationindexhash: string = "baseconversationindexhash";
		public conversationtrackingid: string = "conversationtrackingid";
		public sendermailboxid: string = "sendermailboxid";
		public messageiddupcheck: string = "messageiddupcheck";
		public isbilled: string = "isbilled";
		public prioritycodename: string = "prioritycodename";
		public createdon: string = "createdon";
		public isworkflowcreatedname: string = "isworkflowcreatedname";
		public emailreminderstatus: string = "emailreminderstatus";
		public templateid: string = "templateid";
		public isregularactivityname: string = "isregularactivityname";
		public isemailfollowed: string = "isemailfollowed";
		public category: string = "category";
		public replycount: string = "replycount";
		public actualstart: string = "actualstart";
		public emailremindertype: string = "emailremindertype";
		public owneridyominame: string = "owneridyominame";
		public description: string = "description";
		public modifiedby: string = "modifiedby";
		public isregularactivity: string = "isregularactivity";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public sender: string = "sender";
		public sendersaccountyominame: string = "sendersaccountyominame";
		public traversedpath: string = "traversedpath";
		public isbilledname: string = "isbilledname";
		public sortdate: string = "sortdate";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public owninguser: string = "owninguser";
		public opencount: string = "opencount";
		public safedescription: string = "safedescription";
		public owneridtype: string = "owneridtype";
		public reminderactioncardid: string = "reminderactioncardid";
		public emailreminderstatusname: string = "emailreminderstatusname";
		public isunsafe: string = "isunsafe";
		public notificationsname: string = "notificationsname";
		public sendersaccountname: string = "sendersaccountname";
		public owneridname: string = "owneridname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public directioncodename: string = "directioncodename";
		public deliveryreceiptrequestedname: string = "deliveryreceiptrequestedname";
		public compressedname: string = "compressedname";
		public owningteam: string = "owningteam";
		public actualend: string = "actualend";
		public from: string = "from";
		public deliveryreceiptrequested: string = "deliveryreceiptrequested";
		public followemailuserpreferencename: string = "followemailuserpreferencename";
		public regardingobjectidname: string = "regardingobjectidname";
		public deliveryprioritycodename: string = "deliveryprioritycodename";
		public processid: string = "processid";
		public slainvokedid: string = "slainvokedid";
		public deliveryprioritycode: string = "deliveryprioritycode";
		public transactioncurrencyid: string = "transactioncurrencyid";
		public activitytypecode: string = "activitytypecode";
		public postponeemailprocessinguntil: string = "postponeemailprocessinguntil";
		public emailreminderexpirytime: string = "emailreminderexpirytime";
		public emailremindertext: string = "emailremindertext";
		public slainvokedidname: string = "slainvokedidname";
		public sendermailboxidname: string = "sendermailboxidname";
		public readreceiptrequestedname: string = "readreceiptrequestedname";
		public ownerid: string = "ownerid";
		public inreplyto: string = "inreplyto";
		public compressed: string = "compressed";
		public subject: string = "subject";
		public conversationindex: string = "conversationindex";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public emailtrackingid: string = "emailtrackingid";
		public createdbyname: string = "createdbyname";
		public emailsenderobjecttypecode: string = "emailsenderobjecttypecode";
		public actualdurationminutes: string = "actualdurationminutes";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public lastonholdtime: string = "lastonholdtime";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public createdby: string = "createdby";
		public subcategory: string = "subcategory";
		public templateidname: string = "templateidname";
		public regardingobjectidyominame: string = "regardingobjectidyominame";
		public messageid: string = "messageid";
		public followemailuserpreference: string = "followemailuserpreference";
		public prioritycode: string = "prioritycode";
		public stageid: string = "stageid";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public scheduleddurationminutes: string = "scheduleddurationminutes";
		public attachmentopencount: string = "attachmentopencount";
		public importsequencenumber: string = "importsequencenumber";
		public regardingobjecttypecode: string = "regardingobjecttypecode";
		public deliveryattempts: string = "deliveryattempts";
		public torecipients: string = "torecipients";
		public versionnumber: string = "versionnumber";
		public mimetype: string = "mimetype";
		public cc: string = "cc";
		public scheduledstart: string = "scheduledstart";
		public directioncode: string = "directioncode";
		public emailremindertypename: string = "emailremindertypename";
		public modifiedbyname: string = "modifiedbyname";
		public createdbyyominame: string = "createdbyyominame";
		public serviceid: string = "serviceid";
		public correlationmethod: string = "correlationmethod";
		public slaname: string = "slaname";
		public statecode: string = "statecode";
		
	}
    /** @description Web API attribute string helper class for Email
     */ 
    export class EmailWebAPI {
        public scheduledend: string = "scheduledend";
		public emailsendername: string = "emailsendername";
		public _slaid_value: string = "_slaid_value";
		public parentactivityid: string = "parentactivityid";
		public modifiedon: string = "modifiedon";
		public overriddencreatedon: string = "overriddencreatedon";
		public statuscodename: string = "statuscodename";
		public senton: string = "senton";
		public activityadditionalparams: string = "activityadditionalparams";
		public parentactivityidname: string = "parentactivityidname";
		public sendersaccountobjecttypecode: string = "sendersaccountobjecttypecode";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public delayedemailsendtime: string = "delayedemailsendtime";
		public createdonbehalfby: string = "createdonbehalfby";
		public activityid: string = "activityid";
		public emailsender: string = "emailsender";
		public isworkflowcreated: string = "isworkflowcreated";
		public _regardingobjectid_value: string = "_regardingobjectid_value";
		public submittedby: string = "submittedby";
		public owningbusinessunit: string = "owningbusinessunit";
		public linksclickedcount: string = "linksclickedcount";
		public emailsenderyominame: string = "emailsenderyominame";
		public to: string = "to";
		public activitytypecodename: string = "activitytypecodename";
		public notifications: string = "notifications";
		public isemailfollowedname: string = "isemailfollowedname";
		public trackingtoken: string = "trackingtoken";
		public statuscode: string = "statuscode";
		public onholdtime: string = "onholdtime";
		public bcc: string = "bcc";
		public readreceiptrequested: string = "readreceiptrequested";
		public statecodename: string = "statecodename";
		public sendersaccount: string = "sendersaccount";
		public lastopenedtime: string = "lastopenedtime";
		public attachmentcount: string = "attachmentcount";
		public exchangerate: string = "exchangerate";
		public baseconversationindexhash: string = "baseconversationindexhash";
		public _conversationtrackingid_value: string = "_conversationtrackingid_value";
		public _sendermailboxid_value: string = "_sendermailboxid_value";
		public messageiddupcheck: string = "messageiddupcheck";
		public isbilled: string = "isbilled";
		public prioritycodename: string = "prioritycodename";
		public createdon: string = "createdon";
		public isworkflowcreatedname: string = "isworkflowcreatedname";
		public emailreminderstatus: string = "emailreminderstatus";
		public _templateid_value: string = "_templateid_value";
		public isregularactivityname: string = "isregularactivityname";
		public isemailfollowed: string = "isemailfollowed";
		public category: string = "category";
		public replycount: string = "replycount";
		public actualstart: string = "actualstart";
		public emailremindertype: string = "emailremindertype";
		public owneridyominame: string = "owneridyominame";
		public description: string = "description";
		public modifiedby: string = "modifiedby";
		public isregularactivity: string = "isregularactivity";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public sender: string = "sender";
		public sendersaccountyominame: string = "sendersaccountyominame";
		public traversedpath: string = "traversedpath";
		public isbilledname: string = "isbilledname";
		public sortdate: string = "sortdate";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public owninguser: string = "owninguser";
		public opencount: string = "opencount";
		public safedescription: string = "safedescription";
		public owneridtype: string = "owneridtype";
		public _reminderactioncardid_value: string = "_reminderactioncardid_value";
		public emailreminderstatusname: string = "emailreminderstatusname";
		public isunsafe: string = "isunsafe";
		public notificationsname: string = "notificationsname";
		public sendersaccountname: string = "sendersaccountname";
		public owneridname: string = "owneridname";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public directioncodename: string = "directioncodename";
		public deliveryreceiptrequestedname: string = "deliveryreceiptrequestedname";
		public compressedname: string = "compressedname";
		public owningteam: string = "owningteam";
		public actualend: string = "actualend";
		public from: string = "from";
		public deliveryreceiptrequested: string = "deliveryreceiptrequested";
		public followemailuserpreferencename: string = "followemailuserpreferencename";
		public regardingobjectidname: string = "regardingobjectidname";
		public deliveryprioritycodename: string = "deliveryprioritycodename";
		public _processid_value: string = "_processid_value";
		public _slainvokedid_value: string = "_slainvokedid_value";
		public deliveryprioritycode: string = "deliveryprioritycode";
		public _transactioncurrencyid_value: string = "_transactioncurrencyid_value";
		public activitytypecode: string = "activitytypecode";
		public postponeemailprocessinguntil: string = "postponeemailprocessinguntil";
		public emailreminderexpirytime: string = "emailreminderexpirytime";
		public emailremindertext: string = "emailremindertext";
		public slainvokedidname: string = "slainvokedidname";
		public sendermailboxidname: string = "sendermailboxidname";
		public readreceiptrequestedname: string = "readreceiptrequestedname";
		public _ownerid_value: string = "_ownerid_value";
		public inreplyto: string = "inreplyto";
		public compressed: string = "compressed";
		public subject: string = "subject";
		public conversationindex: string = "conversationindex";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public emailtrackingid: string = "emailtrackingid";
		public createdbyname: string = "createdbyname";
		public emailsenderobjecttypecode: string = "emailsenderobjecttypecode";
		public actualdurationminutes: string = "actualdurationminutes";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public lastonholdtime: string = "lastonholdtime";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public createdby: string = "createdby";
		public subcategory: string = "subcategory";
		public templateidname: string = "templateidname";
		public regardingobjectidyominame: string = "regardingobjectidyominame";
		public _messageid_value: string = "_messageid_value";
		public followemailuserpreference: string = "followemailuserpreference";
		public prioritycode: string = "prioritycode";
		public _stageid_value: string = "_stageid_value";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public scheduleddurationminutes: string = "scheduleddurationminutes";
		public attachmentopencount: string = "attachmentopencount";
		public importsequencenumber: string = "importsequencenumber";
		public regardingobjecttypecode: string = "regardingobjecttypecode";
		public deliveryattempts: string = "deliveryattempts";
		public torecipients: string = "torecipients";
		public versionnumber: string = "versionnumber";
		public mimetype: string = "mimetype";
		public cc: string = "cc";
		public scheduledstart: string = "scheduledstart";
		public directioncode: string = "directioncode";
		public emailremindertypename: string = "emailremindertypename";
		public modifiedbyname: string = "modifiedbyname";
		public createdbyyominame: string = "createdbyyominame";
		public _serviceid_value: string = "_serviceid_value";
		public correlationmethod: string = "correlationmethod";
		public slaname: string = "slaname";
		public statecode: string = "statecode";
			
    }
    /** @description Instantiates a Email Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class Email extends Entity {
		[key: string]: string | number
        public route: string = "emails";
		public scheduledend: string;
		public emailsendername: string;
		public _slaid_value: string;
		public parentactivityid: string;
		public modifiedon: string;
		public overriddencreatedon: string;
		public statuscodename: number;
		public senton: string;
		public activityadditionalparams: string;
		public parentactivityidname: string;
		public sendersaccountobjecttypecode: string;
		public transactioncurrencyidname: string;
		public delayedemailsendtime: string;
		public createdonbehalfby: string;
		public activityid: string;
		public emailsender: string;
		public isworkflowcreated: string;
		public _regardingobjectid_value: string;
		public submittedby: string;
		public owningbusinessunit: string;
		public linksclickedcount: number;
		public emailsenderyominame: string;
		public to: string;
		public activitytypecodename: number;
		public notifications: string;
		public isemailfollowedname: number;
		public trackingtoken: string;
		public statuscode: string;
		public onholdtime: number;
		public bcc: string;
		public readreceiptrequested: string;
		public statecodename: number;
		public sendersaccount: string;
		public lastopenedtime: string;
		public attachmentcount: number;
		public exchangerate: number;
		public baseconversationindexhash: number;
		public _conversationtrackingid_value: string;
		public _sendermailboxid_value: string;
		public messageiddupcheck: string;
		public isbilled: string;
		public prioritycodename: number;
		public createdon: string;
		public isworkflowcreatedname: number;
		public emailreminderstatus: string;
		public _templateid_value: string;
		public isregularactivityname: number;
		public isemailfollowed: string;
		public category: string;
		public replycount: number;
		public actualstart: string;
		public emailremindertype: string;
		public owneridyominame: string;
		public description: string;
		public modifiedby: string;
		public isregularactivity: string;
		public modifiedonbehalfby: string;
		public sender: string;
		public sendersaccountyominame: string;
		public traversedpath: string;
		public isbilledname: number;
		public sortdate: string;
		public createdonbehalfbyname: string;
		public owninguser: string;
		public opencount: number;
		public safedescription: string;
		public owneridtype: string;
		public _reminderactioncardid_value: string;
		public emailreminderstatusname: number;
		public isunsafe: number;
		public notificationsname: number;
		public sendersaccountname: string;
		public owneridname: string;
		public modifiedonbehalfbyname: string;
		public createdonbehalfbyyominame: string;
		public directioncodename: number;
		public deliveryreceiptrequestedname: number;
		public compressedname: number;
		public owningteam: string;
		public actualend: string;
		public from: string;
		public deliveryreceiptrequested: string;
		public followemailuserpreferencename: number;
		public regardingobjectidname: string;
		public deliveryprioritycodename: number;
		public _processid_value: string;
		public _slainvokedid_value: string;
		public deliveryprioritycode: string;
		public _transactioncurrencyid_value: string;
		public activitytypecode: string;
		public postponeemailprocessinguntil: string;
		public emailreminderexpirytime: string;
		public emailremindertext: string;
		public slainvokedidname: string;
		public sendermailboxidname: string;
		public readreceiptrequestedname: number;
		public _ownerid_value: string;
		public inreplyto: string;
		public compressed: string;
		public subject: string;
		public conversationindex: string;
		public timezoneruleversionnumber: number;
		public emailtrackingid: string;
		public createdbyname: string;
		public emailsenderobjecttypecode: string;
		public actualdurationminutes: number;
		public modifiedbyyominame: string;
		public lastonholdtime: string;
		public modifiedonbehalfbyyominame: string;
		public createdby: string;
		public subcategory: string;
		public templateidname: string;
		public regardingobjectidyominame: string;
		public _messageid_value: string;
		public followemailuserpreference: string;
		public prioritycode: string;
		public _stageid_value: string;
		public utcconversiontimezonecode: number;
		public scheduleddurationminutes: number;
		public attachmentopencount: number;
		public importsequencenumber: number;
		public regardingobjecttypecode: string;
		public deliveryattempts: number;
		public torecipients: string;
		public versionnumber: number;
		public mimetype: string;
		public cc: string;
		public scheduledstart: string;
		public directioncode: string;
		public emailremindertypename: number;
		public modifiedbyname: string;
		public createdbyyominame: string;
		public _serviceid_value: string;
		public correlationmethod: string;
		public slaname: string;
		public statecode: number;
			
        
        constructor(initData?: IEmail) {
			super("emails");        
            if (initData == undefined) return;
			this.scheduledend = initData.scheduledend;
			this.emailsendername = initData.emailsendername;
			this._slaid_value = initData._slaid_value;
			this.parentactivityid = initData.parentactivityid;
			this.modifiedon = initData.modifiedon;
			this.overriddencreatedon = initData.overriddencreatedon;
			this.statuscodename = initData.statuscodename;
			this.senton = initData.senton;
			this.activityadditionalparams = initData.activityadditionalparams;
			this.parentactivityidname = initData.parentactivityidname;
			this.sendersaccountobjecttypecode = initData.sendersaccountobjecttypecode;
			this.transactioncurrencyidname = initData.transactioncurrencyidname;
			this.delayedemailsendtime = initData.delayedemailsendtime;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.activityid = initData.activityid;
			this.emailsender = initData.emailsender;
			this.isworkflowcreated = initData.isworkflowcreated;
			this._regardingobjectid_value = initData._regardingobjectid_value;
			this.submittedby = initData.submittedby;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.linksclickedcount = initData.linksclickedcount;
			this.emailsenderyominame = initData.emailsenderyominame;
			this.to = initData.to;
			this.activitytypecodename = initData.activitytypecodename;
			this.notifications = initData.notifications;
			this.isemailfollowedname = initData.isemailfollowedname;
			this.trackingtoken = initData.trackingtoken;
			this.statuscode = initData.statuscode;
			this.onholdtime = initData.onholdtime;
			this.bcc = initData.bcc;
			this.readreceiptrequested = initData.readreceiptrequested;
			this.statecodename = initData.statecodename;
			this.sendersaccount = initData.sendersaccount;
			this.lastopenedtime = initData.lastopenedtime;
			this.attachmentcount = initData.attachmentcount;
			this.exchangerate = initData.exchangerate;
			this.baseconversationindexhash = initData.baseconversationindexhash;
			this._conversationtrackingid_value = initData._conversationtrackingid_value;
			this._sendermailboxid_value = initData._sendermailboxid_value;
			this.messageiddupcheck = initData.messageiddupcheck;
			this.isbilled = initData.isbilled;
			this.prioritycodename = initData.prioritycodename;
			this.createdon = initData.createdon;
			this.isworkflowcreatedname = initData.isworkflowcreatedname;
			this.emailreminderstatus = initData.emailreminderstatus;
			this._templateid_value = initData._templateid_value;
			this.isregularactivityname = initData.isregularactivityname;
			this.isemailfollowed = initData.isemailfollowed;
			this.category = initData.category;
			this.replycount = initData.replycount;
			this.actualstart = initData.actualstart;
			this.emailremindertype = initData.emailremindertype;
			this.owneridyominame = initData.owneridyominame;
			this.description = initData.description;
			this.modifiedby = initData.modifiedby;
			this.isregularactivity = initData.isregularactivity;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.sender = initData.sender;
			this.sendersaccountyominame = initData.sendersaccountyominame;
			this.traversedpath = initData.traversedpath;
			this.isbilledname = initData.isbilledname;
			this.sortdate = initData.sortdate;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.owninguser = initData.owninguser;
			this.opencount = initData.opencount;
			this.safedescription = initData.safedescription;
			this.owneridtype = initData.owneridtype;
			this._reminderactioncardid_value = initData._reminderactioncardid_value;
			this.emailreminderstatusname = initData.emailreminderstatusname;
			this.isunsafe = initData.isunsafe;
			this.notificationsname = initData.notificationsname;
			this.sendersaccountname = initData.sendersaccountname;
			this.owneridname = initData.owneridname;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.directioncodename = initData.directioncodename;
			this.deliveryreceiptrequestedname = initData.deliveryreceiptrequestedname;
			this.compressedname = initData.compressedname;
			this.owningteam = initData.owningteam;
			this.actualend = initData.actualend;
			this.from = initData.from;
			this.deliveryreceiptrequested = initData.deliveryreceiptrequested;
			this.followemailuserpreferencename = initData.followemailuserpreferencename;
			this.regardingobjectidname = initData.regardingobjectidname;
			this.deliveryprioritycodename = initData.deliveryprioritycodename;
			this._processid_value = initData._processid_value;
			this._slainvokedid_value = initData._slainvokedid_value;
			this.deliveryprioritycode = initData.deliveryprioritycode;
			this._transactioncurrencyid_value = initData._transactioncurrencyid_value;
			this.activitytypecode = initData.activitytypecode;
			this.postponeemailprocessinguntil = initData.postponeemailprocessinguntil;
			this.emailreminderexpirytime = initData.emailreminderexpirytime;
			this.emailremindertext = initData.emailremindertext;
			this.slainvokedidname = initData.slainvokedidname;
			this.sendermailboxidname = initData.sendermailboxidname;
			this.readreceiptrequestedname = initData.readreceiptrequestedname;
			this._ownerid_value = initData._ownerid_value;
			this.inreplyto = initData.inreplyto;
			this.compressed = initData.compressed;
			this.subject = initData.subject;
			this.conversationindex = initData.conversationindex;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.emailtrackingid = initData.emailtrackingid;
			this.createdbyname = initData.createdbyname;
			this.emailsenderobjecttypecode = initData.emailsenderobjecttypecode;
			this.actualdurationminutes = initData.actualdurationminutes;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.lastonholdtime = initData.lastonholdtime;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.createdby = initData.createdby;
			this.subcategory = initData.subcategory;
			this.templateidname = initData.templateidname;
			this.regardingobjectidyominame = initData.regardingobjectidyominame;
			this._messageid_value = initData._messageid_value;
			this.followemailuserpreference = initData.followemailuserpreference;
			this.prioritycode = initData.prioritycode;
			this._stageid_value = initData._stageid_value;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.scheduleddurationminutes = initData.scheduleddurationminutes;
			this.attachmentopencount = initData.attachmentopencount;
			this.importsequencenumber = initData.importsequencenumber;
			this.regardingobjecttypecode = initData.regardingobjecttypecode;
			this.deliveryattempts = initData.deliveryattempts;
			this.torecipients = initData.torecipients;
			this.versionnumber = initData.versionnumber;
			this.mimetype = initData.mimetype;
			this.cc = initData.cc;
			this.scheduledstart = initData.scheduledstart;
			this.directioncode = initData.directioncode;
			this.emailremindertypename = initData.emailremindertypename;
			this.modifiedbyname = initData.modifiedbyname;
			this.createdbyyominame = initData.createdbyyominame;
			this._serviceid_value = initData._serviceid_value;
			this.correlationmethod = initData.correlationmethod;
			this.slaname = initData.slaname;
			this.statecode = initData.statecode;
			
            this.id = initData.activityid;
        }
    }
	
    /** @description Collection interface for gnext_message
     */  
	export interface IGnext_messages extends IRetrieveMultipleData<Ignext_message> { }
    /** @description WebAPI interface for gnext_message
     */  
    export interface Ignext_message {
        [key: string]: string | number
        gnext_typename?: number
		isbilled?: string
		prioritycodename?: number
		instancetypecode?: string
		createdon?: string
		statuscodename?: number
		gnext_appeal?: string
		gnext_processedname?: number
		gnext_accountidname?: string
		resources?: string
		from?: string
		_seriesid_value?: string
		isregularactivityname?: number
		traversedpath?: string
		isworkflowcreated?: string
		activityid?: string
		gnext_portalusername?: string
		_gnext_psorecordid_value?: string
		owneridtype?: string
		ismapiprivatename?: number
		customers?: string
		createdonbehalfby?: string
		deliverylastattemptedon?: string
		partners?: string
		modifiedonbehalfbyyominame?: string
		onholdtime?: number
		sendermailboxidname?: string
		regardingobjectidyominame?: string
		owneridname?: string
		prioritycode?: string
		gnext_regarding?: string
		timezoneruleversionnumber?: number
		slainvokedidname?: string
		gnext_psorecordidname?: string
		_exchangeitemid_value?: string
		scheduledstart?: string
		actualstart?: string
		createdonbehalfbyyominame?: string
		modifiedonbehalfby?: string
		exchangerate?: number
		gnext_dateread?: string
		gnext_readby?: string
		owningteam?: string
		deliveryprioritycode?: string
		_sendermailboxid_value?: string
		cc?: string
		_regardingobjectid_value?: string
		_slaid_value?: string
		statecode?: number
		_gnext_applicationpartaid_value?: string
		subject?: string
		importsequencenumber?: number
		bcc?: string
		communityname?: number
		gnext_origination?: string
		overriddencreatedon?: string
		_gnext_accountid_value?: string
		gnext_accountidyominame?: string
		versionnumber?: number
		deliveryprioritycodename?: number
		activitytypecodename?: number
		regardingobjectidname?: string
		activityadditionalparams?: string
		createdonbehalfbyname?: string
		activitytypecode?: string
		utcconversiontimezonecode?: number
		instancetypecodename?: number
		organizer?: string
		gnext_portaluseryominame?: string
		_ownerid_value?: string
		modifiedon?: string
		postponeactivityprocessinguntil?: string
		owneridyominame?: string
		scheduleddurationminutes?: number
		gnext_body?: string
		_processid_value?: string
		description?: string
		slaname?: string
		gnext_applicationpartb?: string
		createdbyname?: string
		regardingobjecttypecode?: string
		gnext_processed?: string
		sortdate?: string
		ismapiprivate?: string
		community?: string
		requiredattendees?: string
		gnext_applicationpartbname?: string
		lastonholdtime?: string
		_stageid_value?: string
		exchangeweblink?: string
		gnext_originationname?: number
		leftvoicemail?: string
		optionalattendees?: string
		_transactioncurrencyid_value?: string
		_slainvokedid_value?: string
		createdby?: string
		modifiedby?: string
		_serviceid_value?: string
		gnext_type?: string
		gnext_portaluser?: string
		createdbyyominame?: string
		owninguser?: string
		transactioncurrencyidname?: string
		gnext_applicationpartaidname?: string
		actualend?: string
		owningbusinessunit?: string
		gnext_appealname?: string
		modifiedbyyominame?: string
		isworkflowcreatedname?: number
		to?: string
		isregularactivity?: string
		modifiedonbehalfbyname?: string
		serviceidname?: string
		isbilledname?: number
		senton?: string
		scheduledend?: string
		statuscode?: string
		modifiedbyname?: string
		actualdurationminutes?: number
		leftvoicemailname?: number
		statecodename?: number
		
    }
    /** @description Form Helper Class for gnext_message
     */ 
	export class gnext_messageForm {
		public gnext_typename: string = "gnext_typename";
		public isbilled: string = "isbilled";
		public prioritycodename: string = "prioritycodename";
		public instancetypecode: string = "instancetypecode";
		public createdon: string = "createdon";
		public statuscodename: string = "statuscodename";
		public gnext_appeal: string = "gnext_appeal";
		public gnext_processedname: string = "gnext_processedname";
		public gnext_accountidname: string = "gnext_accountidname";
		public resources: string = "resources";
		public from: string = "from";
		public seriesid: string = "seriesid";
		public isregularactivityname: string = "isregularactivityname";
		public traversedpath: string = "traversedpath";
		public isworkflowcreated: string = "isworkflowcreated";
		public activityid: string = "activityid";
		public gnext_portalusername: string = "gnext_portalusername";
		public gnext_psorecordid: string = "gnext_psorecordid";
		public owneridtype: string = "owneridtype";
		public ismapiprivatename: string = "ismapiprivatename";
		public customers: string = "customers";
		public createdonbehalfby: string = "createdonbehalfby";
		public deliverylastattemptedon: string = "deliverylastattemptedon";
		public partners: string = "partners";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public onholdtime: string = "onholdtime";
		public sendermailboxidname: string = "sendermailboxidname";
		public regardingobjectidyominame: string = "regardingobjectidyominame";
		public owneridname: string = "owneridname";
		public prioritycode: string = "prioritycode";
		public gnext_regarding: string = "gnext_regarding";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public slainvokedidname: string = "slainvokedidname";
		public gnext_psorecordidname: string = "gnext_psorecordidname";
		public exchangeitemid: string = "exchangeitemid";
		public scheduledstart: string = "scheduledstart";
		public actualstart: string = "actualstart";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public exchangerate: string = "exchangerate";
		public gnext_dateread: string = "gnext_dateread";
		public gnext_readby: string = "gnext_readby";
		public owningteam: string = "owningteam";
		public deliveryprioritycode: string = "deliveryprioritycode";
		public sendermailboxid: string = "sendermailboxid";
		public cc: string = "cc";
		public regardingobjectid: string = "regardingobjectid";
		public slaid: string = "slaid";
		public statecode: string = "statecode";
		public gnext_applicationpartaid: string = "gnext_applicationpartaid";
		public subject: string = "subject";
		public importsequencenumber: string = "importsequencenumber";
		public bcc: string = "bcc";
		public communityname: string = "communityname";
		public gnext_origination: string = "gnext_origination";
		public overriddencreatedon: string = "overriddencreatedon";
		public gnext_accountid: string = "gnext_accountid";
		public gnext_accountidyominame: string = "gnext_accountidyominame";
		public versionnumber: string = "versionnumber";
		public deliveryprioritycodename: string = "deliveryprioritycodename";
		public activitytypecodename: string = "activitytypecodename";
		public regardingobjectidname: string = "regardingobjectidname";
		public activityadditionalparams: string = "activityadditionalparams";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public activitytypecode: string = "activitytypecode";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public instancetypecodename: string = "instancetypecodename";
		public organizer: string = "organizer";
		public gnext_portaluseryominame: string = "gnext_portaluseryominame";
		public ownerid: string = "ownerid";
		public modifiedon: string = "modifiedon";
		public postponeactivityprocessinguntil: string = "postponeactivityprocessinguntil";
		public owneridyominame: string = "owneridyominame";
		public scheduleddurationminutes: string = "scheduleddurationminutes";
		public gnext_body: string = "gnext_body";
		public processid: string = "processid";
		public description: string = "description";
		public slaname: string = "slaname";
		public gnext_applicationpartb: string = "gnext_applicationpartb";
		public createdbyname: string = "createdbyname";
		public regardingobjecttypecode: string = "regardingobjecttypecode";
		public gnext_processed: string = "gnext_processed";
		public sortdate: string = "sortdate";
		public ismapiprivate: string = "ismapiprivate";
		public community: string = "community";
		public requiredattendees: string = "requiredattendees";
		public gnext_applicationpartbname: string = "gnext_applicationpartbname";
		public lastonholdtime: string = "lastonholdtime";
		public stageid: string = "stageid";
		public exchangeweblink: string = "exchangeweblink";
		public gnext_originationname: string = "gnext_originationname";
		public leftvoicemail: string = "leftvoicemail";
		public optionalattendees: string = "optionalattendees";
		public transactioncurrencyid: string = "transactioncurrencyid";
		public slainvokedid: string = "slainvokedid";
		public createdby: string = "createdby";
		public modifiedby: string = "modifiedby";
		public serviceid: string = "serviceid";
		public gnext_type: string = "gnext_type";
		public gnext_portaluser: string = "gnext_portaluser";
		public createdbyyominame: string = "createdbyyominame";
		public owninguser: string = "owninguser";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public gnext_applicationpartaidname: string = "gnext_applicationpartaidname";
		public actualend: string = "actualend";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_appealname: string = "gnext_appealname";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public isworkflowcreatedname: string = "isworkflowcreatedname";
		public to: string = "to";
		public isregularactivity: string = "isregularactivity";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public serviceidname: string = "serviceidname";
		public isbilledname: string = "isbilledname";
		public senton: string = "senton";
		public scheduledend: string = "scheduledend";
		public statuscode: string = "statuscode";
		public modifiedbyname: string = "modifiedbyname";
		public actualdurationminutes: string = "actualdurationminutes";
		public leftvoicemailname: string = "leftvoicemailname";
		public statecodename: string = "statecodename";
		
	}
    /** @description Web API attribute string helper class for gnext_message
     */ 
    export class gnext_messageWebAPI {
        public gnext_typename: string = "gnext_typename";
		public isbilled: string = "isbilled";
		public prioritycodename: string = "prioritycodename";
		public instancetypecode: string = "instancetypecode";
		public createdon: string = "createdon";
		public statuscodename: string = "statuscodename";
		public gnext_appeal: string = "gnext_appeal";
		public gnext_processedname: string = "gnext_processedname";
		public gnext_accountidname: string = "gnext_accountidname";
		public resources: string = "resources";
		public from: string = "from";
		public _seriesid_value: string = "_seriesid_value";
		public isregularactivityname: string = "isregularactivityname";
		public traversedpath: string = "traversedpath";
		public isworkflowcreated: string = "isworkflowcreated";
		public activityid: string = "activityid";
		public gnext_portalusername: string = "gnext_portalusername";
		public _gnext_psorecordid_value: string = "_gnext_psorecordid_value";
		public owneridtype: string = "owneridtype";
		public ismapiprivatename: string = "ismapiprivatename";
		public customers: string = "customers";
		public createdonbehalfby: string = "createdonbehalfby";
		public deliverylastattemptedon: string = "deliverylastattemptedon";
		public partners: string = "partners";
		public modifiedonbehalfbyyominame: string = "modifiedonbehalfbyyominame";
		public onholdtime: string = "onholdtime";
		public sendermailboxidname: string = "sendermailboxidname";
		public regardingobjectidyominame: string = "regardingobjectidyominame";
		public owneridname: string = "owneridname";
		public prioritycode: string = "prioritycode";
		public gnext_regarding: string = "gnext_regarding";
		public timezoneruleversionnumber: string = "timezoneruleversionnumber";
		public slainvokedidname: string = "slainvokedidname";
		public gnext_psorecordidname: string = "gnext_psorecordidname";
		public _exchangeitemid_value: string = "_exchangeitemid_value";
		public scheduledstart: string = "scheduledstart";
		public actualstart: string = "actualstart";
		public createdonbehalfbyyominame: string = "createdonbehalfbyyominame";
		public modifiedonbehalfby: string = "modifiedonbehalfby";
		public exchangerate: string = "exchangerate";
		public gnext_dateread: string = "gnext_dateread";
		public gnext_readby: string = "gnext_readby";
		public owningteam: string = "owningteam";
		public deliveryprioritycode: string = "deliveryprioritycode";
		public _sendermailboxid_value: string = "_sendermailboxid_value";
		public cc: string = "cc";
		public _regardingobjectid_value: string = "_regardingobjectid_value";
		public _slaid_value: string = "_slaid_value";
		public statecode: string = "statecode";
		public _gnext_applicationpartaid_value: string = "_gnext_applicationpartaid_value";
		public subject: string = "subject";
		public importsequencenumber: string = "importsequencenumber";
		public bcc: string = "bcc";
		public communityname: string = "communityname";
		public gnext_origination: string = "gnext_origination";
		public overriddencreatedon: string = "overriddencreatedon";
		public _gnext_accountid_value: string = "_gnext_accountid_value";
		public gnext_accountidyominame: string = "gnext_accountidyominame";
		public versionnumber: string = "versionnumber";
		public deliveryprioritycodename: string = "deliveryprioritycodename";
		public activitytypecodename: string = "activitytypecodename";
		public regardingobjectidname: string = "regardingobjectidname";
		public activityadditionalparams: string = "activityadditionalparams";
		public createdonbehalfbyname: string = "createdonbehalfbyname";
		public activitytypecode: string = "activitytypecode";
		public utcconversiontimezonecode: string = "utcconversiontimezonecode";
		public instancetypecodename: string = "instancetypecodename";
		public organizer: string = "organizer";
		public gnext_portaluseryominame: string = "gnext_portaluseryominame";
		public _ownerid_value: string = "_ownerid_value";
		public modifiedon: string = "modifiedon";
		public postponeactivityprocessinguntil: string = "postponeactivityprocessinguntil";
		public owneridyominame: string = "owneridyominame";
		public scheduleddurationminutes: string = "scheduleddurationminutes";
		public gnext_body: string = "gnext_body";
		public _processid_value: string = "_processid_value";
		public description: string = "description";
		public slaname: string = "slaname";
		public gnext_applicationpartb: string = "gnext_applicationpartb";
		public createdbyname: string = "createdbyname";
		public regardingobjecttypecode: string = "regardingobjecttypecode";
		public gnext_processed: string = "gnext_processed";
		public sortdate: string = "sortdate";
		public ismapiprivate: string = "ismapiprivate";
		public community: string = "community";
		public requiredattendees: string = "requiredattendees";
		public gnext_applicationpartbname: string = "gnext_applicationpartbname";
		public lastonholdtime: string = "lastonholdtime";
		public _stageid_value: string = "_stageid_value";
		public exchangeweblink: string = "exchangeweblink";
		public gnext_originationname: string = "gnext_originationname";
		public leftvoicemail: string = "leftvoicemail";
		public optionalattendees: string = "optionalattendees";
		public _transactioncurrencyid_value: string = "_transactioncurrencyid_value";
		public _slainvokedid_value: string = "_slainvokedid_value";
		public createdby: string = "createdby";
		public modifiedby: string = "modifiedby";
		public _serviceid_value: string = "_serviceid_value";
		public gnext_type: string = "gnext_type";
		public gnext_portaluser: string = "gnext_portaluser";
		public createdbyyominame: string = "createdbyyominame";
		public owninguser: string = "owninguser";
		public transactioncurrencyidname: string = "transactioncurrencyidname";
		public gnext_applicationpartaidname: string = "gnext_applicationpartaidname";
		public actualend: string = "actualend";
		public owningbusinessunit: string = "owningbusinessunit";
		public gnext_appealname: string = "gnext_appealname";
		public modifiedbyyominame: string = "modifiedbyyominame";
		public isworkflowcreatedname: string = "isworkflowcreatedname";
		public to: string = "to";
		public isregularactivity: string = "isregularactivity";
		public modifiedonbehalfbyname: string = "modifiedonbehalfbyname";
		public serviceidname: string = "serviceidname";
		public isbilledname: string = "isbilledname";
		public senton: string = "senton";
		public scheduledend: string = "scheduledend";
		public statuscode: string = "statuscode";
		public modifiedbyname: string = "modifiedbyname";
		public actualdurationminutes: string = "actualdurationminutes";
		public leftvoicemailname: string = "leftvoicemailname";
		public statecodename: string = "statecodename";
			
    }
    /** @description Instantiates a gnext_message Entity to be used for CRUD based operations
     * @param {object} initData An optional parameter for a create and update entities
     */ 
	export class gnext_message extends Entity {
		[key: string]: string | number
        public route: string = "gnext_messages";
		public gnext_typename: number;
		public isbilled: string;
		public prioritycodename: number;
		public instancetypecode: string;
		public createdon: string;
		public statuscodename: number;
		public gnext_appeal: string;
		public gnext_processedname: number;
		public gnext_accountidname: string;
		public resources: string;
		public from: string;
		public _seriesid_value: string;
		public isregularactivityname: number;
		public traversedpath: string;
		public isworkflowcreated: string;
		public activityid: string;
		public gnext_portalusername: string;
		public _gnext_psorecordid_value: string;
		public owneridtype: string;
		public ismapiprivatename: number;
		public customers: string;
		public createdonbehalfby: string;
		public deliverylastattemptedon: string;
		public partners: string;
		public modifiedonbehalfbyyominame: string;
		public onholdtime: number;
		public sendermailboxidname: string;
		public regardingobjectidyominame: string;
		public owneridname: string;
		public prioritycode: string;
		public gnext_regarding: string;
		public timezoneruleversionnumber: number;
		public slainvokedidname: string;
		public gnext_psorecordidname: string;
		public _exchangeitemid_value: string;
		public scheduledstart: string;
		public actualstart: string;
		public createdonbehalfbyyominame: string;
		public modifiedonbehalfby: string;
		public exchangerate: number;
		public gnext_dateread: string;
		public gnext_readby: string;
		public owningteam: string;
		public deliveryprioritycode: string;
		public _sendermailboxid_value: string;
		public cc: string;
		public _regardingobjectid_value: string;
		public _slaid_value: string;
		public statecode: number;
		public _gnext_applicationpartaid_value: string;
		public subject: string;
		public importsequencenumber: number;
		public bcc: string;
		public communityname: number;
		public gnext_origination: string;
		public overriddencreatedon: string;
		public _gnext_accountid_value: string;
		public gnext_accountidyominame: string;
		public versionnumber: number;
		public deliveryprioritycodename: number;
		public activitytypecodename: number;
		public regardingobjectidname: string;
		public activityadditionalparams: string;
		public createdonbehalfbyname: string;
		public activitytypecode: string;
		public utcconversiontimezonecode: number;
		public instancetypecodename: number;
		public organizer: string;
		public gnext_portaluseryominame: string;
		public _ownerid_value: string;
		public modifiedon: string;
		public postponeactivityprocessinguntil: string;
		public owneridyominame: string;
		public scheduleddurationminutes: number;
		public gnext_body: string;
		public _processid_value: string;
		public description: string;
		public slaname: string;
		public gnext_applicationpartb: string;
		public createdbyname: string;
		public regardingobjecttypecode: string;
		public gnext_processed: string;
		public sortdate: string;
		public ismapiprivate: string;
		public community: string;
		public requiredattendees: string;
		public gnext_applicationpartbname: string;
		public lastonholdtime: string;
		public _stageid_value: string;
		public exchangeweblink: string;
		public gnext_originationname: number;
		public leftvoicemail: string;
		public optionalattendees: string;
		public _transactioncurrencyid_value: string;
		public _slainvokedid_value: string;
		public createdby: string;
		public modifiedby: string;
		public _serviceid_value: string;
		public gnext_type: string;
		public gnext_portaluser: string;
		public createdbyyominame: string;
		public owninguser: string;
		public transactioncurrencyidname: string;
		public gnext_applicationpartaidname: string;
		public actualend: string;
		public owningbusinessunit: string;
		public gnext_appealname: string;
		public modifiedbyyominame: string;
		public isworkflowcreatedname: number;
		public to: string;
		public isregularactivity: string;
		public modifiedonbehalfbyname: string;
		public serviceidname: string;
		public isbilledname: number;
		public senton: string;
		public scheduledend: string;
		public statuscode: string;
		public modifiedbyname: string;
		public actualdurationminutes: number;
		public leftvoicemailname: number;
		public statecodename: number;
			
        
        constructor(initData?: Ignext_message) {
			super("gnext_messages");        
            if (initData == undefined) return;
			this.gnext_typename = initData.gnext_typename;
			this.isbilled = initData.isbilled;
			this.prioritycodename = initData.prioritycodename;
			this.instancetypecode = initData.instancetypecode;
			this.createdon = initData.createdon;
			this.statuscodename = initData.statuscodename;
			this.gnext_appeal = initData.gnext_appeal;
			this.gnext_processedname = initData.gnext_processedname;
			this.gnext_accountidname = initData.gnext_accountidname;
			this.resources = initData.resources;
			this.from = initData.from;
			this._seriesid_value = initData._seriesid_value;
			this.isregularactivityname = initData.isregularactivityname;
			this.traversedpath = initData.traversedpath;
			this.isworkflowcreated = initData.isworkflowcreated;
			this.activityid = initData.activityid;
			this.gnext_portalusername = initData.gnext_portalusername;
			this._gnext_psorecordid_value = initData._gnext_psorecordid_value;
			this.owneridtype = initData.owneridtype;
			this.ismapiprivatename = initData.ismapiprivatename;
			this.customers = initData.customers;
			this.createdonbehalfby = initData.createdonbehalfby;
			this.deliverylastattemptedon = initData.deliverylastattemptedon;
			this.partners = initData.partners;
			this.modifiedonbehalfbyyominame = initData.modifiedonbehalfbyyominame;
			this.onholdtime = initData.onholdtime;
			this.sendermailboxidname = initData.sendermailboxidname;
			this.regardingobjectidyominame = initData.regardingobjectidyominame;
			this.owneridname = initData.owneridname;
			this.prioritycode = initData.prioritycode;
			this.gnext_regarding = initData.gnext_regarding;
			this.timezoneruleversionnumber = initData.timezoneruleversionnumber;
			this.slainvokedidname = initData.slainvokedidname;
			this.gnext_psorecordidname = initData.gnext_psorecordidname;
			this._exchangeitemid_value = initData._exchangeitemid_value;
			this.scheduledstart = initData.scheduledstart;
			this.actualstart = initData.actualstart;
			this.createdonbehalfbyyominame = initData.createdonbehalfbyyominame;
			this.modifiedonbehalfby = initData.modifiedonbehalfby;
			this.exchangerate = initData.exchangerate;
			this.gnext_dateread = initData.gnext_dateread;
			this.gnext_readby = initData.gnext_readby;
			this.owningteam = initData.owningteam;
			this.deliveryprioritycode = initData.deliveryprioritycode;
			this._sendermailboxid_value = initData._sendermailboxid_value;
			this.cc = initData.cc;
			this._regardingobjectid_value = initData._regardingobjectid_value;
			this._slaid_value = initData._slaid_value;
			this.statecode = initData.statecode;
			this._gnext_applicationpartaid_value = initData._gnext_applicationpartaid_value;
			this.subject = initData.subject;
			this.importsequencenumber = initData.importsequencenumber;
			this.bcc = initData.bcc;
			this.communityname = initData.communityname;
			this.gnext_origination = initData.gnext_origination;
			this.overriddencreatedon = initData.overriddencreatedon;
			this._gnext_accountid_value = initData._gnext_accountid_value;
			this.gnext_accountidyominame = initData.gnext_accountidyominame;
			this.versionnumber = initData.versionnumber;
			this.deliveryprioritycodename = initData.deliveryprioritycodename;
			this.activitytypecodename = initData.activitytypecodename;
			this.regardingobjectidname = initData.regardingobjectidname;
			this.activityadditionalparams = initData.activityadditionalparams;
			this.createdonbehalfbyname = initData.createdonbehalfbyname;
			this.activitytypecode = initData.activitytypecode;
			this.utcconversiontimezonecode = initData.utcconversiontimezonecode;
			this.instancetypecodename = initData.instancetypecodename;
			this.organizer = initData.organizer;
			this.gnext_portaluseryominame = initData.gnext_portaluseryominame;
			this._ownerid_value = initData._ownerid_value;
			this.modifiedon = initData.modifiedon;
			this.postponeactivityprocessinguntil = initData.postponeactivityprocessinguntil;
			this.owneridyominame = initData.owneridyominame;
			this.scheduleddurationminutes = initData.scheduleddurationminutes;
			this.gnext_body = initData.gnext_body;
			this._processid_value = initData._processid_value;
			this.description = initData.description;
			this.slaname = initData.slaname;
			this.gnext_applicationpartb = initData.gnext_applicationpartb;
			this.createdbyname = initData.createdbyname;
			this.regardingobjecttypecode = initData.regardingobjecttypecode;
			this.gnext_processed = initData.gnext_processed;
			this.sortdate = initData.sortdate;
			this.ismapiprivate = initData.ismapiprivate;
			this.community = initData.community;
			this.requiredattendees = initData.requiredattendees;
			this.gnext_applicationpartbname = initData.gnext_applicationpartbname;
			this.lastonholdtime = initData.lastonholdtime;
			this._stageid_value = initData._stageid_value;
			this.exchangeweblink = initData.exchangeweblink;
			this.gnext_originationname = initData.gnext_originationname;
			this.leftvoicemail = initData.leftvoicemail;
			this.optionalattendees = initData.optionalattendees;
			this._transactioncurrencyid_value = initData._transactioncurrencyid_value;
			this._slainvokedid_value = initData._slainvokedid_value;
			this.createdby = initData.createdby;
			this.modifiedby = initData.modifiedby;
			this._serviceid_value = initData._serviceid_value;
			this.gnext_type = initData.gnext_type;
			this.gnext_portaluser = initData.gnext_portaluser;
			this.createdbyyominame = initData.createdbyyominame;
			this.owninguser = initData.owninguser;
			this.transactioncurrencyidname = initData.transactioncurrencyidname;
			this.gnext_applicationpartaidname = initData.gnext_applicationpartaidname;
			this.actualend = initData.actualend;
			this.owningbusinessunit = initData.owningbusinessunit;
			this.gnext_appealname = initData.gnext_appealname;
			this.modifiedbyyominame = initData.modifiedbyyominame;
			this.isworkflowcreatedname = initData.isworkflowcreatedname;
			this.to = initData.to;
			this.isregularactivity = initData.isregularactivity;
			this.modifiedonbehalfbyname = initData.modifiedonbehalfbyname;
			this.serviceidname = initData.serviceidname;
			this.isbilledname = initData.isbilledname;
			this.senton = initData.senton;
			this.scheduledend = initData.scheduledend;
			this.statuscode = initData.statuscode;
			this.modifiedbyname = initData.modifiedbyname;
			this.actualdurationminutes = initData.actualdurationminutes;
			this.leftvoicemailname = initData.leftvoicemailname;
			this.statecodename = initData.statecodename;
			
            this.id = initData.activityid;
        }
    }
		
}