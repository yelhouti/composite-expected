package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.Employee} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.EmployeeResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /employees?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EmployeeCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter username;

    private StringFilter fullname;

    private LongFilter teamMemberId;

    private LongFilter skillId;

    private LongFilter taughtSkillId;

    private LongFilter managerId;

    public EmployeeCriteria() {}

    public EmployeeCriteria(EmployeeCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.username = other.username == null ? null : other.username.copy();
        this.fullname = other.fullname == null ? null : other.fullname.copy();
        this.teamMemberId = other.teamMemberId == null ? null : other.teamMemberId.copy();
        this.skillId = other.skillId == null ? null : other.skillId.copy();
        this.taughtSkillId = other.taughtSkillId == null ? null : other.taughtSkillId.copy();
        this.managerId = other.managerId == null ? null : other.managerId.copy();
    }

    @Override
    public EmployeeCriteria copy() {
        return new EmployeeCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getUsername() {
        return username;
    }

    public void setUsername(StringFilter username) {
        this.username = username;
    }

    public StringFilter getFullname() {
        return fullname;
    }

    public void setFullname(StringFilter fullname) {
        this.fullname = fullname;
    }

    public LongFilter getTeamMemberId() {
        return teamMemberId;
    }

    public void setTeamMemberId(LongFilter teamMemberId) {
        this.teamMemberId = teamMemberId;
    }

    public LongFilter getSkillId() {
        return skillId;
    }

    public void setSkillId(LongFilter skillId) {
        this.skillId = skillId;
    }

    public LongFilter getTaughtSkillId() {
        return taughtSkillId;
    }

    public void setTaughtSkillId(LongFilter taughtSkillId) {
        this.taughtSkillId = taughtSkillId;
    }

    public LongFilter getManagerId() {
        return managerId;
    }

    public void setManagerId(LongFilter managerId) {
        this.managerId = managerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EmployeeCriteria that = (EmployeeCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(username, that.username) &&
            Objects.equals(fullname, that.fullname) &&
            Objects.equals(teamMemberId, that.teamMemberId) &&
            Objects.equals(skillId, that.skillId) &&
            Objects.equals(taughtSkillId, that.taughtSkillId) &&
            Objects.equals(managerId, that.managerId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, fullname, teamMemberId, skillId, taughtSkillId, managerId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (username != null ? "username=" + username + ", " : "") +
                (fullname != null ? "fullname=" + fullname + ", " : "") +
                (teamMemberId != null ? "teamMemberId=" + teamMemberId + ", " : "") +
                (skillId != null ? "skillId=" + skillId + ", " : "") +
                (taughtSkillId != null ? "taughtSkillId=" + taughtSkillId + ", " : "") +
                (managerId != null ? "managerId=" + managerId + ", " : "") +
            "}";
    }
}
