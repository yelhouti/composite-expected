package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.PriceFormulaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link PriceFormula} and its DTO {@link PriceFormulaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PriceFormulaMapper extends EntityMapper<PriceFormulaDTO, PriceFormula> {}
