CREATE TABLE IF NOT EXISTS citya.egf_vendor
(
    id BIGSERIAL NOT NULL,
    code character varying(50) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    correspondenceaddress character varying(250) COLLATE pg_catalog."default",
    paymentaddress character varying(250) COLLATE pg_catalog."default",
    contactperson character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    narration character varying(1024) COLLATE pg_catalog."default",
    pannumber character varying(14) COLLATE pg_catalog."default",
    tinnumber character varying(15) COLLATE pg_catalog."default",
    bank bigint,
    ifsccode character varying(15) COLLATE pg_catalog."default",
    bankaccount character varying(22) COLLATE pg_catalog."default",
    registrationnumber character varying(50) COLLATE pg_catalog."default",
    status bigint,
    createdby bigint NOT NULL,
    lastmodifiedby bigint,
    createddate timestamp without time zone NOT NULL,
    lastmodifieddate timestamp without time zone,
    version bigint,
    mobilenumber character varying(12) COLLATE pg_catalog."default",
    epfnumber character varying(24) COLLATE pg_catalog."default",
    esinumber character varying(21) COLLATE pg_catalog."default",
    gstregisteredstate character varying(250) COLLATE pg_catalog."default",
    vendortype character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT pk_vendor PRIMARY KEY (id),
    CONSTRAINT unq_vendor UNIQUE (code),
    CONSTRAINT fk_vendor_bank FOREIGN KEY (bank)
        REFERENCES citya.bank (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS citya.egf_vendor
    OWNER to postgres;
