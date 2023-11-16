package kosa.afnica.backend.api.service;

import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.reservation.CreateReservationDto;
import kosa.afnica.backend.db.dto.reservation.ReservationDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
public interface ReservationService {

     public List<ReservationDto> readReservationList(HttpServletRequest request);

}