package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.EmployeeSkillCertificateDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmployeeSkillCertificateDetails} and its DTO {@link EmployeeSkillCertificateDetailsDTO}.
 */
@Mapper(componentModel = "spring", uses = { EmployeeSkillCertificateMapper.class })
public interface EmployeeSkillCertificateDetailsMapper
    extends EntityMapper<EmployeeSkillCertificateDetailsDTO, EmployeeSkillCertificateDetails> {
    @Mapping(target = "employeeSkillCertificate", source = "employeeSkillCertificate", qualifiedByName = "id")
    EmployeeSkillCertificateDetailsDTO toDto(EmployeeSkillCertificateDetails employeeSkillCertificateDetails);

    @Mapping(target = "id.typeId", source = "employeeSkillCertificate.type.id")
    @Mapping(target = "id.skillName", source = "employeeSkillCertificate.skill.name")
    @Mapping(target = "id.skillEmployeeUsername", source = "employeeSkillCertificate.skill.employee.username")
    EmployeeSkillCertificateDetails toEntity(EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO);

    @Named("partialUpdate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "employeeSkillCertificate", ignore = true)
    @Mapping(target = "id", ignore = true)
    void partialUpdate(
        @MappingTarget EmployeeSkillCertificateDetails employeeSkillCertificateDetails,
        EmployeeSkillCertificateDetailsDTO employeeSkillCertificateDetailsDTO
    );
}
