package company.bresolin.backend.service;

import company.bresolin.backend.entities.House;
import company.bresolin.backend.entities.User;
import company.bresolin.backend.entities.dto.HouseCreateDTO;
import company.bresolin.backend.repository.HouseRepository;
import company.bresolin.backend.repository.UserRepository;
import org.apache.coyote.BadRequestException;
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

    public ResponseEntity<?> createHouse(House house, Authentication authentication) {
        try {
            Optional<User> owner = userRepository.findByCpf(authentication.getName());

            house.setOwner(owner.orElseThrow(
                    () -> new BadRequestException("User not found")
            ));

            houseRepository.save(house);
            return ResponseEntity.ok().body(house);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating house");
        }
    }
}
