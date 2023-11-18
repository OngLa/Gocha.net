package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.CarDataService;
import kosa.afnica.backend.db.dto.carData.CarDataReqDto;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/car-data")
public class CarDataController {

    private final CarDataService carDataService;

    @Operation(summary = "차량 데이터 불러오기 API", description = "차량 데이터 불러오기 API - 현대 API로부터 차량 데이터 불러오기, 차량 데이터 페이지에서 버튼 눌리면 호출되는 API")
    @PostMapping()
    public ResponseEntity<Void> postCarData(@RequestBody CarDataReqDto reqDto) {
        carDataService.createCarData(reqDto);

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "Car ID 기반으로 등록된 최신 Car Data 불러오기 API", description = "Car Data 불러오기 API - 내 차 정보 페이지에 렌더링 시 호출될 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = CarDataResDto.class)))
    })
    @GetMapping("/recent-data")
    public ResponseEntity<CarDataResDto> getCarList(@RequestParam Long carId) {
        CarDataResDto resDto = carDataService.findAllCarDataByCarId(carId);

        return ResponseEntity.ok(resDto);
    }
}
