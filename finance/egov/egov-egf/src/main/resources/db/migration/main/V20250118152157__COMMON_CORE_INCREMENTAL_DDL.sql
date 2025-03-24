
CREATE TABLE eg_action (
	id int8 NOT NULL,
	"name" varchar(100) NOT NULL,
	url varchar(150) NULL,
	queryparams varchar(150) NULL,
	parentmodule int8 NOT NULL,
	ordernumber int8 NULL,
	displayname varchar(80) NULL,
	enabled bool NULL,
	contextroot varchar(32) NULL,
	"version" numeric DEFAULT 0 NOT NULL,
	createdby numeric DEFAULT 1 NULL,
	createddate timestamp DEFAULT now() NULL,
	lastmodifiedby numeric DEFAULT 1 NULL,
	lastmodifieddate timestamp DEFAULT now() NULL,
	application int8 NOT NULL
);



CREATE TABLE eg_billregisterwithpurchaseitems (
	id int8 NOT NULL,
	billregister_id varchar(100) NOT NULL,
	itemcode varchar NOT NULL,
	unitrate int8 NOT NULL,
	quantity int8 NOT NULL,
	amount int8 NOT NULL,
	ordernumber varchar NOT NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	"version" int8 NULL,
	purchaseorder_id int8 NULL,
	gstrate int8 NULL,
	unitvaluewithgst int8 NULL
);




ALTER TABLE eg_billregisterwithpurchaseitems ADD CONSTRAINT eg_billregisterwithpurchaseitems_fk FOREIGN KEY (billregister_id) REFERENCES eg_billregister(billnumber);
ALTER TABLE eg_billregisterwithpurchaseitems ADD CONSTRAINT fk_eg_billregisterwithpurchaseitems FOREIGN KEY (purchaseorder_id) REFERENCES egf_purchaseorder(id);




CREATE TABLE eg_role (
	id int8 NOT NULL,
	"name" varchar(32) NOT NULL,
	description varchar(128) NULL,
	createddate timestamp DEFAULT 'now'::text::timestamp without time zone NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	lastmodifieddate timestamp NULL,
	"version" int8 NULL,
	internal bool DEFAULT false NULL
);

ALTER TABLE eg_billdetails ADD "percent" numeric(13, 2) NULL;


CREATE TABLE eg_roleaction (
	roleid int8 NOT NULL,
	actionid int8 NOT NULL
);



CREATE TABLE egf_purchaseitems (
	id int8 NOT NULL,
	itemcode varchar NOT NULL,
	unit varchar NOT NULL,
	unitrate int8 NOT NULL,
	quantity int8 NOT NULL,
	amount int8 NOT NULL,
	purchase_order_id int8 NOT NULL,
	createdby varchar NULL,
	lastmodifiedby varchar NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	"version" int4 NULL,
	ordernumber varchar(100) NULL,
	glcodeid int8 NULL,
	gstrate int8 NULL,
	unitvaluewithgst int8 NULL
);



ALTER TABLE egf_purchaseitems ADD CONSTRAINT egf_purchaseitems_fk FOREIGN KEY (purchase_order_id) REFERENCES egf_purchaseorder(id);



CREATE TABLE egf_purchaseorder_aud (
	id int8 NULL,
	"name" varchar(100) NULL,
	ordernumber varchar(100) NULL,
	orderdate timestamp NULL,
	supplier int8 NULL,
	ordervalue numeric NULL,
	advancepayable numeric NULL,
	description varchar(250) NULL,
	fund int8 NULL,
	department varchar(100) NULL,
	scheme int8 NULL,
	subscheme int8 NULL,
	sanctionnumber varchar(100) NULL,
	sanctiondate timestamp NULL,
	active bool NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	"version" int8 NULL,
	nameofmodifyinguser varchar NULL,
	revtype numeric NULL,
	rev int4 NULL
);



CREATE TABLE egf_supplier_aud (
	id int8 NOT NULL,
	code varchar(50) NULL,
	"name" varchar(100) NULL,
	correspondenceaddress varchar(250) NULL,
	paymentaddress varchar(250) NULL,
	contactperson varchar(100) NULL,
	email varchar(100) NULL,
	narration varchar(1024) NULL,
	pannumber varchar(14) NULL,
	tinnumber varchar(15) NULL,
	mobilenumber varchar(12) NULL,
	bank int8 NULL,
	ifsccode varchar(15) NULL,
	bankaccount varchar(22) NULL,
	registrationnumber varchar(50) NULL,
	status int8 NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	"version" int8 NULL,
	epfnumber varchar(24) NULL,
	esinumber varchar(21) NULL,
	gstregisteredstate varchar(250) NULL,
	suppliertype varchar(50) NULL,
	revtype numeric NULL,
	rev int4 NOT NULL,
	nameofmodifyinguser varchar NULL
);



CREATE TABLE egf_workorder_aud (
	id int8 NULL,
	"name" varchar(100) NULL,
	ordernumber varchar(100) NULL,
	orderdate timestamp NULL,
	contractor int8 NULL,
	ordervalue numeric NULL,
	advancepayable numeric NULL,
	description varchar(250) NULL,
	fund int8 NULL,
	department varchar(100) NULL,
	scheme int8 NULL,
	subscheme int8 NULL,
	sanctionnumber varchar(100) NULL,
	sanctiondate timestamp NULL,
	active bool NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	"version" int8 NULL,
	nameofmodifyinguser varchar NULL,
	revtype numeric NULL,
	rev int4 NULL
);



CREATE TABLE pt_master (
	id int4 NOT NULL,
	tenantid varchar(255) NULL,
	from_date date NULL,
	to_date date NULL,
	sys_creat timestamp NULL,
	sys_updat timestamp NULL,
	status int4 NULL,
	recordsend int4 NULL,
	recordrow int4 NULL,
	CONSTRAINT pt_master_pkey PRIMARY KEY (id)
);



CREATE TABLE schedulechart (
	"name" varchar(255) NULL,
	scheduleid int4 NULL,
	glcode varchar(255) NULL
);



CREATE TABLE temppurpose (
	glcode varchar(50) NOT NULL,
	"name" varchar(250) NULL,
	purposeid int8 NULL
);



CREATE TABLE bank_aud (
	id int8 NULL,
	code varchar(50) NULL,
	"name" varchar(100) NULL,
	narration varchar(250) NULL,
	isactive bool NULL,
	"type" varchar(50) NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	lastmodifiedby int8 NULL,
	"version" int8 NULL,
	createdby int8 NULL,
	nameofmodifyinguser varchar NULL,
	revtype numeric NULL,
	rev int4 NULL
);



CREATE TABLE bankaccount_aud (
	id int8 NULL,
	branchid int8 NULL,
	accountnumber varchar(20) NULL,
	accounttype varchar(150) NULL,
	narration varchar(250) NULL,
	isactive bool NULL,
	glcodeid int8 NULL,
	fundid int8 NULL,
	payto varchar(100) NULL,
	"type" varchar(50) NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	"version" int8 NULL,
	chequeformatid int8 NULL,
	nameofmodifyinguser varchar NULL,
	revtype numeric NULL,
	rev int4 NULL
);



CREATE TABLE bankbranch_aud (
	id int8 NULL,
	branchcode varchar(50) NULL,
	branchname varchar(50) NULL,
	branchaddress1 varchar(50) NULL,
	branchaddress2 varchar(50) NULL,
	branchcity varchar(50) NULL,
	branchstate varchar(50) NULL,
	branchpin varchar(50) NULL,
	branchphone varchar(15) NULL,
	branchfax varchar(15) NULL,
	bankid int8 NULL,
	contactperson varchar(50) NULL,
	isactive bool NULL,
	narration varchar(250) NULL,
	micr varchar(50) NULL,
	createddate timestamp DEFAULT now() NULL,
	lastmodifieddate timestamp DEFAULT now() NULL,
	lastmodifiedby int8 NULL,
	"version" int8 DEFAULT 0 NULL,
	createdby int8 NULL,
	nameofmodifyinguser varchar NULL,
	revtype numeric NULL,
	rev int4 NULL
);



CREATE TABLE grant_amount_transfer (
	id int8 NOT NULL,
	code varchar(260) NULL,
	"name" varchar(270) NULL,
	"date" timestamp NULL,
	isactive bool DEFAULT false NULL,
	description varchar(255) NULL,
	fundid int8 NULL,
	schemeid int8 NULL,
	ulbname varchar(255) NULL,
	ulbcode varchar(20) NULL,
	amount numeric NULL,
	"amountinWords" varchar(255) NULL,
	bankid varchar(255) NULL,
	branchid int8 NULL,
	bankaccountnumber varchar(50) NULL,
	bankifsc varchar(20) NULL,
	createddate timestamp NULL,
	lastmodifieddate timestamp NULL,
	createdby int8 NULL,
	lastmodifiedby int8 NULL,
	bankaccounttype varchar(255) NULL,
	city varchar(250) NULL,
	flag int4 NULL,
	CONSTRAINT grant_amount_transfer_pkey PRIMARY KEY (id)
);



CREATE TABLE property_tax_demand_register (
	id int8 NOT NULL,
	propertyid varchar(255) NOT NULL,
	oldpropertyid varchar(255) NULL,
	doorno varchar(255) NULL,
	mohalla varchar(255) NULL,
	propertytype varchar(255) NULL,
	"usage" varchar(255) NULL,
	"name" varchar(255) NULL,
	currentarv varchar(255) NULL,
	currenttax varchar(255) NULL,
	currentrebate varchar(255) NULL,
	arreartax varchar(255) NULL,
	penaltytax varchar(255) NULL,
	rebate varchar(255) NULL,
	totaltax varchar(255) NULL,
	currentcollected varchar(255) NULL,
	arrearcollected varchar(255) NULL,
	penaltycollected varchar(255) NULL,
	totalcollected varchar(255) NULL,
	voucherid int8 NULL,
	flag int4 NULL,
	createddate timestamp NULL,
	updateddate timestamp NULL,
	note varchar(255) NULL,
	systemcreateddate timestamp NULL,
	systemupdateddate timestamp NULL,
	CONSTRAINT property_tax_demand_register_pkey PRIMARY KEY (id)
);




ALTER TABLE property_tax_demand_register ADD CONSTRAINT fk_vhid FOREIGN KEY (voucherid) REFERENCES voucherheader(id);



CREATE TABLE property_tax_module_codes_mapping_with_coa (
	id int8 NULL,
	glcode varchar(255) NOT NULL,
	"name" varchar(255) NULL,
	accounthead varchar(255) NULL,
	propertytype varchar(255) NULL,
	propertytypecode varchar(255) NULL,
	"usage" varchar(255) NULL,
	glcodeid int8 NULL,
	propertytypeaccounthead varchar(255) NULL,
	propertytypecodeid int8 NULL
);



CREATE TABLE property_tax_receipt_register (
	id serial4 NOT NULL,
	tenantid varchar(255) NULL,
	propertyid varchar(255) NULL,
	receiptnumber varchar(255) NULL,
	receiptdate varchar(255) NULL,
	paymentmode varchar(255) NULL,
	transactionnumber varchar(255) NULL,
	interest varchar(255) NULL,
	penalty varchar(255) NULL,
	swatchathatax varchar(255) NULL,
	propertytax varchar(255) NULL,
	totalcollection varchar(255) NULL,
	username varchar(255) NULL,
	mohallaname varchar(255) NULL,
	doorno varchar(255) NULL,
	"name" varchar(255) NULL,
	user_uuid varchar(255) NULL,
	system_updateddate timestamp NULL,
	flag int4 NULL,
	note varchar(255) NULL,
	system_createddate timestamp NULL,
	createddate timestamp NULL,
	updateddate timestamp NULL,
	voucherid int8 NULL,
	CONSTRAINT property_tax_receipt_register_pkey PRIMARY KEY (id)
);



ALTER TABLE property_tax_receipt_register ADD CONSTRAINT fk_vhid FOREIGN KEY (voucherid) REFERENCES voucherheader(id);
-- SEQUENCE: seq_eg_billregisterwithpurchaseitems

-- DROP SEQUENCE IF EXISTS seq_eg_billregisterwithpurchaseitems;

CREATE SEQUENCE IF NOT EXISTS seq_eg_billregisterwithpurchaseitems
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE seq_eg_billregisterwithpurchaseitems
    OWNER TO postgres;

-- SEQUENCE: seq_egf_purchaseitems

-- DROP SEQUENCE IF EXISTS seq_egf_purchaseitems;

CREATE SEQUENCE IF NOT EXISTS seq_egf_purchaseitems
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE seq_egf_purchaseitems
    OWNER TO postgres;
-- SEQUENCE: property_tax_receipt_register_id_seq

-- DROP SEQUENCE IF EXISTS property_tax_receipt_register_id_seq;

CREATE SEQUENCE IF NOT EXISTS property_tax_receipt_register_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
    
    
CREATE SEQUENCE IF NOT EXISTS seq_egf_grantamount
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
   
 ALTER SEQUENCE seq_egf_grantamount OWNER TO postgres;

ALTER SEQUENCE property_tax_receipt_register_id_seq
    OWNED BY property_tax_receipt_register.id;

ALTER SEQUENCE property_tax_receipt_register_id_seq
    OWNER TO postgres;

