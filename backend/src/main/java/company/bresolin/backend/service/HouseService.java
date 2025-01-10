package company.bresolin.backend.service;

import company.bresolin.backend.entities.House;
import company.bresolin.backend.entities.User;
import company.bresolin.backend.entities.dto.HouseCreateDTO;
import company.bresolin.backend.repository.HouseRepository;
import company.bresolin.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HouseService {
    HouseRepository houseRepository;
    UserRepository userRepository;

    public HouseService(HouseRepository houseRepository, UserRepository userRepository) {
        this.houseRepository = houseRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> createHouse(HouseCreateDTO house, Authentication authentication) {
        try {
            Optional<User> owner = userRepository.findByCpf(authentication.getName());

            House house1 = new House();
            house1.setOwner(owner.get());
            house1.setName(house.name());

            houseRepository.save(house1);
            return ResponseEntity.ok().body(house1);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating house");
        }
    }
}
