package kosa.afnica.backend.api.controller;

import kosa.afnica.backend.api.service.CarService;
import kosa.afnica.backend.db.entity.CarBrand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cars")
public class CarController {

    private final CarService carService;

    @PostMapping("/brand")
    public ResponseEntity<Void> insertBrand(
            @RequestPart MultipartFile file,
            @RequestPart CarBrand carBrand
    ) {
        carService.insertBrand(file, carBrand);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/brand")
    public ResponseEntity<List<CarBrand>> getBrandList() {
        List<CarBrand> resDtoList = carService.getBrandList();

        return ResponseEntity.ok(resDtoList);
    }

}
