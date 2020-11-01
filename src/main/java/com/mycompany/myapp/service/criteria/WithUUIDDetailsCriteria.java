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
import tech.jhipster.service.filter.UUIDFilter;

/**
 * Criteria class for the {@link com.mycompany.myapp.domain.WithUUIDDetails} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.WithUUIDDetailsResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /with-uuid-details?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class WithUUIDDetailsCriteria implements Serializable, Criteria {
    private static final long serialVersionUID = 1L;

    private UUIDFilter uuid;

    private StringFilter details;

    private UUIDFilter withUUIDId;

    public WithUUIDDetailsCriteria() {}

    public WithUUIDDetailsCriteria(WithUUIDDetailsCriteria other) {
        this.uuid = other.uuid == null ? null : other.uuid.copy();
        this.details = other.details == null ? null : other.details.copy();
        this.withUUIDId = other.withUUIDId == null ? null : other.withUUIDId.copy();
    }

    @Override
    public WithUUIDDetailsCriteria copy() {
        return new WithUUIDDetailsCriteria(this);
    }

    public UUIDFilter getUuid() {
        return uuid;
    }

    public UUIDFilter uuid() {
        if (uuid == null) {
            uuid = new UUIDFilter();
        }
        return uuid;
    }

    public void setUuid(UUIDFilter uuid) {
        this.uuid = uuid;
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

    public UUIDFilter getWithUUIDId() {
        return withUUIDId;
    }

    public UUIDFilter withUUIDId() {
        if (withUUIDId == null) {
            withUUIDId = new UUIDFilter();
        }
        return withUUIDId;
    }

    public void setWithUUIDId(UUIDFilter withUUIDId) {
        this.withUUIDId = withUUIDId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final WithUUIDDetailsCriteria that = (WithUUIDDetailsCriteria) o;
        return Objects.equals(uuid, that.uuid) && Objects.equals(details, that.details) && Objects.equals(withUUIDId, that.withUUIDId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, details, withUUIDId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithUUIDDetailsCriteria{" +
            (uuid != null ? "uuid=" + uuid + ", " : "") +
            (details != null ? "details=" + details + ", " : "") +
            (withUUIDId != null ? "withUUIDId=" + withUUIDId + ", " : "") +
            "}";
    }
}
