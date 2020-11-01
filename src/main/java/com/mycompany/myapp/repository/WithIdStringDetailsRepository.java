package com.mycompany.myapp.repository;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.WithIdStringDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WithIdStringDetails entity.
 */
@SuppressWarnings("unused")
@Repository
@GeneratedByJHipster
public interface WithIdStringDetailsRepository
    extends JpaRepository<WithIdStringDetails, Long>, JpaSpecificationExecutor<WithIdStringDetails> {}
