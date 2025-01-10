package company.bresolin.backend.controller;

import company.bresolin.backend.entities.dto.HouseCreateDTO;
import company.bresolin.backend.service.HouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("api/v1/house")
@RestController
public class HouseController {
    HouseService houseService;

    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    @PostMapping
    public ResponseEntity<?> createHouse(@RequestBody HouseCreateDTO house, Authentication authentication) {
        if (house == null || house.name() == null || house.name().isBlank()){
            return ResponseEntity.badRequest().body("House cannot be null");
        }

        return houseService.createHouse(house, authentication);
    }
}
