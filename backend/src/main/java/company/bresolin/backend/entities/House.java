package company.bresolin.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_house")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHouse;
    private String name;
    private String description;
    private Integer rooms;
    private Integer bathrooms;
    private Double area;
    private Double price;
    private Double tax;
    @OneToOne
    private Address address;
    @ManyToOne
    private User user;

    public Long setOwner(User user) {
        this.user = user;
        return this.idHouse;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}