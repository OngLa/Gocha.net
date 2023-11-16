package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.ReservationService;
import kosa.afnica.backend.config.exception.ErrorResponse;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.car.CarTypeResDto;
import kosa.afnica.backend.db.dto.reservation.ReservationDto;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.entity.Reservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member/reservation")
//@CrossOrigin("*")
public class ReservationController {

    private final ReservationService reservationService;

//######################################################################################################################

    //유저 예약목록 출력
    @Operation(summary = "예약목록 불러오기 API", description = "얘약목록 불러오기 API - 예약관리 클릭시 랜더링되는 예약목록 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReservationDto.class)))),
            @ApiResponse(responseCode = "404", description = "예약 목록이 존재하지 않습니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })

    @GetMapping("/list")
    public List<ReservationDto> getReservaionList(HttpServletRequest request) {
        log.info(request.getHeader("Authorization").substring(7));

        List<ReservationDto> reservationList = reservationService.readReservationList(request);

        return reservationList;
    }
//######################################################################################################################

    @Operation(summary = "예약하기 API", description = "예약하기 클릭시 db에 저장되는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReservationDto.class)))),
    })
    @PostMapping("")
    public ResponseEntity<Void> postReservation(HttpServletRequest request, @RequestBody ReservationReqDto reservationreqdto){

        reservationService.createReservation(request,reservationreqdto);
        return ResponseEntity.ok(null);
    }

}
