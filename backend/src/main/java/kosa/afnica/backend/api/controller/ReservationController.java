package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.ReservationService;
import kosa.afnica.backend.config.exception.ErrorResponse;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.dto.reservation.AdminDto;
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

    //예약 출력
    @Operation(summary = "예약목록 불러오기 API", description = "얘약목록 불러오기 API - 예약관리 클릭시 랜더링되는 예약목록 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReservationResDto.class)))),
            @ApiResponse(responseCode = "404", description = "예약 목록이 존재하지 않습니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })

    @GetMapping("/list")
    public List<ReservationResDto> getReservaionList(HttpServletRequest request) {
        //유저 예약목록 출력
        List<ReservationResDto> reservationList = reservationService.readReservationList(request);

        return reservationList;
    }

//######################################################################################################################
//예약하기

    //예약 하기
    @Operation(summary = "예약하기 API", description = "예약하기 클릭시 db에 저장되는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReservationResDto.class)))),
    })
    @PostMapping("")
    public ResponseEntity<Void> postReservation(HttpServletRequest request, @RequestBody ReservationReqDto reservationReqDto){
        reservationService.createReservation(request,reservationReqDto);

        return ResponseEntity.ok(null);
    }

    //예약 삭제
    @Operation(summary = "예약취소 API", description = "예약취소 클릭시 db의 예약목록 삭제 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Reservation.class)))),
            @ApiResponse(responseCode = "404", description = "이미 삭제된 예약입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    //ADMIN 예약자 출력
    @Operation(summary = "예약자 목록 불러오기 API", description = "얘약자 목록 불러오기 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = ReservationResDto.class)))),
            @ApiResponse(responseCode = "404", description = "예약 목록이 존재하지 않습니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })

    @GetMapping("/bookerlist")
    public List<AdminDto> getReservaionUserList(HttpServletRequest request) {

        return reservationService.findReservationUserList(request);
    }
}
