package org.egov.egf.masters.services;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;

import org.egov.commons.Accountdetailkey;
import org.egov.commons.service.AccountDetailKeyService;
import org.egov.commons.service.AccountdetailtypeService;
import org.egov.commons.service.EntityTypeService;
import org.egov.egf.masters.repository.VendorRepository;
import org.egov.infra.config.core.ApplicationThreadLocals;
import org.egov.infra.validation.exception.ValidationException;
import org.egov.model.masters.Vendor;
import org.egov.model.masters.VendorSearchRequest;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Santosh Kumar Mahto
 */

@Service
@Transactional(readOnly = true)
public class VendorService implements EntityTypeService {

    @Autowired
    private VendorRepository vendorRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AccountDetailKeyService accountDetailKeyService;

    @Autowired
    private AccountdetailtypeService accountdetailtypeService;

    public Session getCurrentSession() {
        return entityManager.unwrap(Session.class);
    }

    public Vendor getById(final Long id) {
        return vendorRepository.findOne(id);
    }

    @Transactional
    public Vendor create(Vendor vendor) {

        setAuditDetails(vendor);
        vendor = vendorRepository.save(vendor);
        saveAccountDetailKey(vendor);
        return vendor;
    }

    @Transactional
    public void saveAccountDetailKey(Vendor vendor) {

        Accountdetailkey accountdetailkey = new Accountdetailkey();
        accountdetailkey.setDetailkey(vendor.getId().intValue());
        accountdetailkey.setDetailname(vendor.getName());
        accountdetailkey.setAccountdetailtype(accountdetailtypeService.findByName(vendor.getClass().getSimpleName()));
        accountdetailkey.setGroupid(1);
        accountDetailKeyService.create(accountdetailkey);
    }

    @Transactional
    public Vendor update(final Vendor vendor) {
        setAuditDetails(vendor);
        return vendorRepository.save(vendor);
    }

    private void setAuditDetails(Vendor vendor) {
        if (vendor.getId() == null) {
        	vendor.setCreatedDate(new Date());
        	vendor.setCreatedBy(ApplicationThreadLocals.getUserId());
        }
        vendor.setLastModifiedDate(new Date());
        vendor.setLastModifiedBy(ApplicationThreadLocals.getUserId());
    }

    public List<Vendor> search(final VendorSearchRequest vendorSearchRequest) {
        final CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        final CriteriaQuery<Vendor> createQuery = cb.createQuery(Vendor.class);
        final Root<Vendor> vendors = createQuery.from(Vendor.class);
        createQuery.select(vendors);
        final Metamodel m = entityManager.getMetamodel();
        final EntityType<Vendor> vendorEntityType = m.entity(Vendor.class);

        final List<Predicate> predicates = new ArrayList<>();
        if (vendorSearchRequest.getName() != null) {
            final String name = "%" + vendorSearchRequest.getName().toLowerCase() + "%";
            predicates.add(cb.isNotNull(vendors.get("name")));
            predicates.add(cb.like(
                    cb.lower(vendors.get(vendorEntityType.getDeclaredSingularAttribute("name", String.class))), name));
        }
        if (vendorSearchRequest.getCode() != null) {
            final String code = "%" + vendorSearchRequest.getCode().toLowerCase() + "%";
            predicates.add(cb.isNotNull(vendors.get("code")));
            predicates.add(cb.like(
                    cb.lower(vendors.get(vendorEntityType.getDeclaredSingularAttribute("code", String.class))), code));
        }

        createQuery.where(predicates.toArray(new Predicate[] {}));
        final TypedQuery<Vendor> query = entityManager.createQuery(createQuery);
        return query.getResultList();

    }

    public List<Vendor> getAllActiveVendors() {
        return vendorRepository.findByStatus();
    }
    
    @Override
    public List<? extends org.egov.commons.utils.EntityType> getAllActiveEntities(Integer accountDetailTypeId) {
        return vendorRepository.findByStatus();
    }

    @Override
    public List<? extends org.egov.commons.utils.EntityType> filterActiveEntities(String filterKey, int maxRecords,
            Integer accountDetailTypeId) {
        return vendorRepository.findByNameLikeIgnoreCaseOrCodeLikeIgnoreCase(filterKey + "%", filterKey + "%");
    }

	@Override
	public List<? extends org.egov.commons.utils.EntityType> getAssetCodesForProjectCode(Integer accountdetailkey)
			throws ValidationException {
		return Collections.emptyList();
	}

	@Override
	public List<? extends org.egov.commons.utils.EntityType> validateEntityForRTGS(List<Long> idsList)
			throws ValidationException {
		return Collections.emptyList();
	}

	@Override
	public List<? extends org.egov.commons.utils.EntityType> getEntitiesById(List<Long> idsList)
			throws ValidationException {
		return Collections.emptyList();
	}

	
	@Transactional
	public String vendorCode() {
	    Long nextSeq = Optional.ofNullable(vendorRepository.getNextVendorSequence()).orElse(0L) + 1;
	    String supCode = "Ven/001/" + String.format("%04d", nextSeq);
	    return supCode;
	}
	@Transactional
	public String fetchLastId() {
		
	    Long lastId =  vendorRepository.findMaxId()+1;
	    String supCode;
	    if(lastId != null) {
	    	if(lastId < 1000) 
	    		supCode = "Ven/001/"+String.format("%04d", lastId);
	    	else
	    		supCode = "Ven/001/"+lastId;
	    }
	    else
	    	supCode = "Ven/001/0001";
	    return  supCode;
	}
	
}
