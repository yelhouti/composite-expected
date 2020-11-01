package com.mycompany.myapp.repository;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.PriceFormula;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PriceFormula entity.
 */
@SuppressWarnings("unused")
@Repository
@GeneratedByJHipster
public interface PriceFormulaRepository extends JpaRepository<PriceFormula, Integer>, JpaSpecificationExecutor<PriceFormula> {}
