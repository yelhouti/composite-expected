package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.GeneratedByJHipster;
import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.EmployeeSkillDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link EmployeeSkill} and its DTO {@link EmployeeSkillDTO}.
 */
@Mapper(componentModel = "spring", uses = { TaskMapper.class, EmployeeMapper.class })
@GeneratedByJHipster
public interface EmployeeSkillMapper extends EntityMapper<EmployeeSkillDTO, EmployeeSkill> {
    @Mapping(target = "employee", source = "employee", qualifiedByName = "fullname")
    @Mapping(target = "teacher", source = "teacher", qualifiedByName = "fullname")
    EmployeeSkillDTO toDto(EmployeeSkill employeeSkill);

    @Mapping(target = "employeeSkillCertificates", ignore = true)
    @Mapping(target = "removeEmployeeSkillCertificate", ignore = true)
    @Mapping(target = "removeTask", ignore = true)
    EmployeeSkill toEntity(EmployeeSkillDTO employeeSkillDTO);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "name")
    EmployeeSkillDTO toDtoId(EmployeeSkill employeeSkill);
}
