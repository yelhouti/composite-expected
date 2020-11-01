package com.mycompany.myapp.service.criteria;

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

    private StringFilter username;

    private StringFilter fullname;

    private StringFilter teamMemberId;

    private LongFilter skillId;

    private LongFilter taughtSkillId;

    private StringFilter managerId;

    public EmployeeCriteria() {}

    public EmployeeCriteria(EmployeeCriteria other) {
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

    public StringFilter getUsername() {
        return username;
    }

    public StringFilter username() {
        if (username == null) {
            username = new StringFilter();
        }
        return username;
    }

    public void setUsername(StringFilter username) {
        this.username = username;
    }

    public StringFilter getFullname() {
        return fullname;
    }

    public StringFilter fullname() {
        if (fullname == null) {
            fullname = new StringFilter();
        }
        return fullname;
    }

    public void setFullname(StringFilter fullname) {
        this.fullname = fullname;
    }

    public StringFilter getTeamMemberId() {
        return teamMemberId;
    }

    public StringFilter teamMemberId() {
        if (teamMemberId == null) {
            teamMemberId = new StringFilter();
        }
        return teamMemberId;
    }

    public void setTeamMemberId(StringFilter teamMemberId) {
        this.teamMemberId = teamMemberId;
    }

    public LongFilter getSkillId() {
        return skillId;
    }

    public LongFilter skillId() {
        if (skillId == null) {
            skillId = new LongFilter();
        }
        return skillId;
    }

    public void setSkillId(LongFilter skillId) {
        this.skillId = skillId;
    }

    public LongFilter getTaughtSkillId() {
        return taughtSkillId;
    }

    public LongFilter taughtSkillId() {
        if (taughtSkillId == null) {
            taughtSkillId = new LongFilter();
        }
        return taughtSkillId;
    }

    public void setTaughtSkillId(LongFilter taughtSkillId) {
        this.taughtSkillId = taughtSkillId;
    }

    public StringFilter getManagerId() {
        return managerId;
    }

    public StringFilter managerId() {
        if (managerId == null) {
            managerId = new StringFilter();
        }
        return managerId;
    }

    public void setManagerId(StringFilter managerId) {
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
        return Objects.hash(username, fullname, teamMemberId, skillId, taughtSkillId, managerId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmployeeCriteria{" +
            (username != null ? "username=" + username + ", " : "") +
            (fullname != null ? "fullname=" + fullname + ", " : "") +
            (teamMemberId != null ? "teamMemberId=" + teamMemberId + ", " : "") +
            (skillId != null ? "skillId=" + skillId + ", " : "") +
            (taughtSkillId != null ? "taughtSkillId=" + taughtSkillId + ", " : "") +
            (managerId != null ? "managerId=" + managerId + ", " : "") +
            "}";
    }
}
