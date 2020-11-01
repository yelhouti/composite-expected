package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WithUUID;
import java.util.UUID;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the WithUUID entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WithUUIDRepository extends JpaRepository<WithUUID, UUID>, JpaSpecificationExecutor<WithUUID> {}
