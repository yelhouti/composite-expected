package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.WithUUIDDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WithUUID} and its DTO {@link WithUUIDDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WithUUIDMapper extends EntityMapper<WithUUIDDTO, WithUUID> {
    @Mapping(target = "withUUIDDetails", ignore = true)
    WithUUID toEntity(WithUUIDDTO withUUIDDTO);

    @Named("uuid")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "uuid", source = "uuid")
    WithUUIDDTO toDtoUuid(WithUUID withUUID);
}
