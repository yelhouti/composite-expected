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
 * Criteria class for the {@link com.mycompany.myapp.domain.WithIdString} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.WithIdStringResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /with-id-strings?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class WithIdStringCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private StringFilter id;

    private StringFilter name;

    private StringFilter withIdStringDetailsId;

    public WithIdStringCriteria() {}

    public WithIdStringCriteria(WithIdStringCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.withIdStringDetailsId = other.withIdStringDetailsId == null ? null : other.withIdStringDetailsId.copy();
    }

    @Override
    public WithIdStringCriteria copy() {
        return new WithIdStringCriteria(this);
    }

    public StringFilter getId() {
        return id;
    }

    public StringFilter id() {
        if (id == null) {
            id = new StringFilter();
        }
        return id;
    }

    public void setId(StringFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public StringFilter name() {
        if (name == null) {
            name = new StringFilter();
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getWithIdStringDetailsId() {
        return withIdStringDetailsId;
    }

    public StringFilter withIdStringDetailsId() {
        if (withIdStringDetailsId == null) {
            withIdStringDetailsId = new StringFilter();
        }
        return withIdStringDetailsId;
    }

    public void setWithIdStringDetailsId(StringFilter withIdStringDetailsId) {
        this.withIdStringDetailsId = withIdStringDetailsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final WithIdStringCriteria that = (WithIdStringCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(withIdStringDetailsId, that.withIdStringDetailsId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, withIdStringDetailsId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (name != null ? "name=" + name + ", " : "") +
            (withIdStringDetailsId != null ? "withIdStringDetailsId=" + withIdStringDetailsId + ", " : "") +
            "}";
    }
}
