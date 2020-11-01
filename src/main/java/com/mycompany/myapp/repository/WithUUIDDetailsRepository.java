package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WithUUIDDetails;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WithUUIDDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WithUUIDDetailsRepository extends JpaRepository<WithUUIDDetails, UUID>, JpaSpecificationExecutor<WithUUIDDetails> {}
