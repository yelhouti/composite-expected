package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.WithUUIDDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WithUUIDDetails} and its DTO {@link WithUUIDDetailsDTO}.
 */
@Mapper(componentModel = "spring", uses = { WithUUIDMapper.class })
public interface WithUUIDDetailsMapper extends EntityMapper<WithUUIDDetailsDTO, WithUUIDDetails> {
    @Mapping(target = "withUUID", source = "withUUID", qualifiedByName = "uuid")
    WithUUIDDetailsDTO toDto(WithUUIDDetails withUUIDDetails);

    @Named("partialUpdate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "withUUID", ignore = true)
    void partialUpdate(@MappingTarget WithUUIDDetails withUUIDDetails, WithUUIDDetailsDTO withUUIDDetailsDTO);
}
