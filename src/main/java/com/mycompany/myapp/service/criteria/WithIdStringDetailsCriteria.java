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
 * Criteria class for the {@link com.mycompany.myapp.domain.WithIdStringDetails} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.WithIdStringDetailsResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /with-id-string-details?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class WithIdStringDetailsCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private StringFilter id;

    private StringFilter details;

    private WithIdStringCriteria withIdString;

    public WithIdStringDetailsCriteria() {}

    public WithIdStringDetailsCriteria(WithIdStringDetailsCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.details = other.details == null ? null : other.details.copy();
        this.withIdString = other.withIdString == null ? null : other.withIdString.copy();
    }

    @Override
    public WithIdStringDetailsCriteria copy() {
        return new WithIdStringDetailsCriteria(this);
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

    public StringFilter getDetails() {
        return details;
    }

    public StringFilter details() {
        if (details == null) {
            details = new StringFilter();
        }
        return details;
    }

    public void setDetails(StringFilter details) {
        this.details = details;
    }

    public WithIdStringCriteria getWithIdString() {
        return withIdString;
    }

    public WithIdStringCriteria withIdString() {
        if (withIdString == null) {
            withIdString = new WithIdStringCriteria();
        }
        return withIdString;
    }

    public void setWithIdString(WithIdStringCriteria withIdString) {
        this.withIdString = withIdString;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final WithIdStringDetailsCriteria that = (WithIdStringDetailsCriteria) o;
        return Objects.equals(id, that.id) && Objects.equals(details, that.details) && Objects.equals(withIdString, that.withIdString);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, details, withIdString);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringDetailsCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (details != null ? "details=" + details + ", " : "") +
            (withIdString != null ? "withIdString=" + withIdString + ", " : "") +
            "}";
    }
}
