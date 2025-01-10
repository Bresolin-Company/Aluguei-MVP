package company.bresolin.backend.repository;

import company.bresolin.backend.entities.House;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Long>{
}
