package org.egov.egf.masters.repository;

import java.util.List;

import org.egov.model.masters.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * @author Santosh Kumar mahto
 *
 */

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    public List<Vendor> findByNameLikeIgnoreCaseOrCodeLikeIgnoreCase(String name, String code);
    
    @Query("from Vendor where status.code='Active'")
    public List<Vendor> findByStatus();
    
    @Query(value = "SELECT MAX(id) FROM Vendor")
    Long findMaxId();
    
    @Query(value = "SELECT nextval('SEQ_EGF_VENDOR')", nativeQuery = true)
    Long getNextVendorSequence();

}