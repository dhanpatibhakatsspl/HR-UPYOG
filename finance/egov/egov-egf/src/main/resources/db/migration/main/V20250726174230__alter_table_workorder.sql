ALTER TABLE egf_workorder
ADD COLUMN orderType character varying(100),
ADD COLUMN emdAmount numeric NOT NULL,
ADD COLUMN bgAmount numeric NOT NULL,
ADD COLUMN apbg numeric NOT NULL;
