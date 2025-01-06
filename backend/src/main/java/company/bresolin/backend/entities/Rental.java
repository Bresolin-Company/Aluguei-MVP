package company.bresolin.backend.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tb_rentals")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRental;
    private Date dateStart;
    private Date dateEnd;
    @Column(length = 20971520)
    private byte[] contract;
    @ManyToOne
    private House house;
    @ManyToOne
    private User user;
}
