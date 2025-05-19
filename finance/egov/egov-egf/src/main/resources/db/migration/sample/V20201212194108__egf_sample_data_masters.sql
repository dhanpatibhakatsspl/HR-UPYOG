---Banks
INSERT INTO bank (id, code, name, narration, isactive, lastmodifieddate, createddate, lastmodifiedby, type,version,createdby) VALUES (nextval('seq_bank'),'SBI','STATE BANK OF INDIA','STATE BANK OF INDIA', true, now(), now(), 1, NULL,0,1) ON CONFLICT DO NOTHING;


----BankBranch
INSERT INTO bankbranch(id, branchcode, branchname, branchaddress1, branchaddress2, branchcity,branchstate,branchpin, branchphone,branchfax, bankid, contactperson,isactive, narration, micr, createddate, lastmodifieddate, lastmodifiedby, createdby,version)
VALUES (nextval('seq_bankbranch'),'6305','SBI Tresury Branch, Kurnool','COLLECTOR COMPLEX DISTT KURNOOL ANDHRA PRADESH',null,null,null,null,'408743462',null,(select id from bank where code='SBI'),'Branch Manager',true,'Operating Current Accounts','518002007',now(),now(),1,1,0) ON CONFLICT DO NOTHING;

         

-----BankAccount

INSERT INTO bankaccount(id, branchid, accountnumber, accounttype, narration, isactive,glcodeid, fundid, payto, type, createdby, lastmodifiedby, createddate,lastmodifieddate, version, chequeformatid)
VALUES (nextval('seq_bankaccount'),(select id from bankbranch where branchcode='6305'),'844102001001VN','45021 - Nationalised Banks','PD Account-001',true,(select id from chartofaccounts where glcode='4502101'),(select id from fund where code='01'),'Commissioner, KMC','RECEIPTS_PAYMENTS',1,1,now(),now(),0,null) ON CONFLICT DO NOTHING;

----Deduction
INSERT INTO tds (id,type,glcodeid,isactive,lastmodifieddate,createddate,createdby,recoveryname,recovery_mode,remitted,description,partytypeid,version) values (nextval('seq_tds'),'CPF',(select id from chartofaccounts where glcode='3502003'),true,now(),now(),1,'CPF Deduction','M','Central Provident Fund Board','CPF Deduction',(select id from eg_partytype where code='Employee'),0) ON CONFLICT DO NOTHING;


-----Contractor
INSERT INTO egf_contractor(id, code,name, correspondenceaddress, paymentaddress, contactperson, email, narration, pannumber,tinnumber, bank, ifsccode, bankaccount,registrationnumber, status, createdby, lastmodifiedby, createddate,lastmodifieddate, version, mobilenumber, epfnumber, esinumber,gstregisteredstate)
 VALUES (nextval('SEQ_EGF_CONTRACTOR'),'PRE000142','Preetpal and Sons','#123 Sector 22 Chandighar','Sector 17, Chandigarh','Preetpal Singh','Preetpalxxyyzz@gmail.com',null,'CMBV4534M','22AAAAA0000A1Z5',(select id from bank where name='Punjab Gramin Bank'),'PUNB0309300','00002445789613','XYZ123',(select id from egw_status where code='Active' and moduletype='Contractor'),1,1,now(),now(),0,'9847591236',null,null,'22AAAAA0000A1Z5') ON CONFLICT DO NOTHING;

------Supplier
INSERT INTO egf_supplier(id, code, name, correspondenceaddress, paymentaddress, contactperson,email, narration, pannumber, tinnumber, mobilenumber, bank, ifsccode,bankaccount, registrationnumber, status, createdby, lastmodifiedby, createddate, lastmodifieddate, version, epfnumber, esinumber,gstregisteredstate)
VALUES (nextval('SEQ_EGF_SUPPLIER'),'ABZ123','Harpaal and Sons','#123 Sector 22 Chandighar','Sector 27, Chandigarh','Harpaal Singh','harpaalxyz@gmail.com',null,'CMBOS8521V','22AAAAA0000A1Z5','9845298412',(select id from bank where name='Punjab Gramin Bank'),'PUNB0309300','1457954263','974521236',(select id from egw_status where code='Active' and moduletype='Supplier'),1,1,now(),now(),0,null,null,'22AAAAA0000A1Z5') ON CONFLICT DO NOTHING;

---------Scheme
INSERT INTO scheme(id, code, name, validfrom, validto, isactive, description, fundid,createddate, lastmodifieddate, createdby,lastmodifiedby) VALUES (nextval('seq_scheme'),'10','AMRUT','05/01/2018','06/01/2021',true,'Amrut',(select id from fund where code='02'),now(),now(),1,1) ON CONFLICT DO NOTHING;


-----Sub-Scheme
INSERT INTO sub_scheme(id, code,name,validfrom, validto, isactive, schemeid,initial_estimate_amount,createddate, createdby, lastmodifiedby,lastmodifieddate) VALUES (nextval('seq_sub_scheme'),'1003','Storm Water Drains','05/01/2018','06/01/2021',true,(select id from scheme where code='10'),2500000,now(),1,1,now()) ON CONFLICT DO NOTHING;


