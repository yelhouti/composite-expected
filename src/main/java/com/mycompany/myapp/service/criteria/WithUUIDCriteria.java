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
 * Criteria class for the {@link com.mycompany.myapp.domain.WithUUID} entity. This class is used
 * in {@link com.mycompany.myapp.web.rest.WithUUIDResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /with-uuids?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class WithUUIDCriteria implements Serializable, Criteria {
    private static final long serialVersionUID = 1L;

    private UUIDFilter uuid;

    private StringFilter name;

    private UUIDFilter withUUIDDetailsId;

    public WithUUIDCriteria() {}

    public WithUUIDCriteria(WithUUIDCriteria other) {
        this.uuid = other.uuid == null ? null : other.uuid.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.withUUIDDetailsId = other.withUUIDDetailsId == null ? null : other.withUUIDDetailsId.copy();
    }

    @Override
    public WithUUIDCriteria copy() {
        return new WithUUIDCriteria(this);
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

    public UUIDFilter getWithUUIDDetailsId() {
        return withUUIDDetailsId;
    }

    public UUIDFilter withUUIDDetailsId() {
        if (withUUIDDetailsId == null) {
            withUUIDDetailsId = new UUIDFilter();
        }
        return withUUIDDetailsId;
    }

    public void setWithUUIDDetailsId(UUIDFilter withUUIDDetailsId) {
        this.withUUIDDetailsId = withUUIDDetailsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final WithUUIDCriteria that = (WithUUIDCriteria) o;
        return (
            Objects.equals(uuid, that.uuid) && Objects.equals(name, that.name) && Objects.equals(withUUIDDetailsId, that.withUUIDDetailsId)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid, name, withUUIDDetailsId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithUUIDCriteria{" +
            (uuid != null ? "uuid=" + uuid + ", " : "") +
            (name != null ? "name=" + name + ", " : "") +
            (withUUIDDetailsId != null ? "withUUIDDetailsId=" + withUUIDDetailsId + ", " : "") +
            "}";
    }
}
