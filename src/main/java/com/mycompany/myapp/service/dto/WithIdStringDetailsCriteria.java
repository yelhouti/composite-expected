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

    private LongFilter id;

    private StringFilter name;

    private LongFilter withIdStringId;

    public WithIdStringDetailsCriteria() {}

    public WithIdStringDetailsCriteria(WithIdStringDetailsCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.name = other.name == null ? null : other.name.copy();
        this.withIdStringId = other.withIdStringId == null ? null : other.withIdStringId.copy();
    }

    @Override
    public WithIdStringDetailsCriteria copy() {
        return new WithIdStringDetailsCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public LongFilter getWithIdStringId() {
        return withIdStringId;
    }

    public void setWithIdStringId(LongFilter withIdStringId) {
        this.withIdStringId = withIdStringId;
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
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(withIdStringId, that.withIdStringId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, withIdStringId);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WithIdStringDetailsCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (name != null ? "name=" + name + ", " : "") +
                (withIdStringId != null ? "withIdStringId=" + withIdStringId + ", " : "") +
            "}";
    }
}
