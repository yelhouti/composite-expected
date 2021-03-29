package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.WithIdStringDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WithIdStringDetails} and its DTO {@link WithIdStringDetailsDTO}.
 */
@Mapper(componentModel = "spring", uses = { WithIdStringMapper.class })
public interface WithIdStringDetailsMapper extends EntityMapper<WithIdStringDetailsDTO, WithIdStringDetails> {
    @Mapping(target = "withIdString", source = "withIdString", qualifiedByName = "id")
    WithIdStringDetailsDTO toDto(WithIdStringDetails withIdStringDetails);

    @Named("partialUpdate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "withIdString", ignore = true)
    void partialUpdate(@MappingTarget WithIdStringDetails withIdStringDetails, WithIdStringDetailsDTO withIdStringDetailsDTO);
}
