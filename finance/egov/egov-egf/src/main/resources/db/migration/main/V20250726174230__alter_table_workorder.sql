ALTER TABLE egf_workorder
ADD COLUMN orderType character varying(100),
ADD COLUMN emdAmount numeric NOT NULL,
ADD COLUMN bgAmount numeric NOT NULL,
ADD COLUMN apbg numeric NOT NULL;

ALTER TABLE egf_supplier
ADD COLUMN source character varying(100);

ALTER TABLE egf_contractor
ADD COLUMN source character varying(100);
