package  com.springboot.backend.universidadbeca.modelo;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.springboot.backend.beca.modelo.Beca;
import com.springboot.backend.universidad.modelo.Universidad;

import jakarta.persistence.*;

@Entity
@Table(name="universidad_beca")
public class UniversidadBeca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="universidad_id")
    @JsonIgnoreProperties({"universidad_beca"})
    private Universidad universidad;

    @ManyToOne
    @JoinColumn(name="beca_id")
    @JsonIgnoreProperties({"universidad_beca"})
    private Beca beca;

    public UniversidadBeca(){}

    public UniversidadBeca(Long id, Universidad universidad, Beca beca) {
        this.id = id;
        this.universidad = universidad;
        this.beca = beca;
    }

    public UniversidadBeca(Universidad universidad, Beca beca) {
        this.universidad = universidad;
        this.beca = beca;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Universidad getUniversidad() {
        return universidad;
    }

    public void setUniversidad(Universidad universidad) {
        this.universidad = universidad;
    }

    public Beca getBeca() {
        return beca;
    }

    public void setBeca(Beca beca) {
        this.beca = beca;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UniversidadBeca universidadBeca = (UniversidadBeca) o;
        return Objects.equals(id, universidadBeca.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}