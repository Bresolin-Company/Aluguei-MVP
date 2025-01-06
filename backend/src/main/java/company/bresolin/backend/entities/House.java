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
    private Double price;
    private Double tax;
    @OneToOne
    private Address address;
    @ManyToOne
    private User user;

}