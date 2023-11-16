package kosa.afnica.backend.api.controller;

import kosa.afnica.backend.api.service.ReservationService;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.reservation.ReservationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    //유저 예약목록 출력
    @GetMapping("/list")
    public List<ReservationDto> getReservaionList(HttpServletRequest request) {
        List<ReservationDto> reservationList = reservationService.readReservationList(request);

        return reservationList;


    }

}
