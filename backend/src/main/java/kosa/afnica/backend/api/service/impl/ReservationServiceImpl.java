package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.ReservationService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.reservation.AdminDto;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ReservationMapper reservationMapper;

    //예약 출력
    @Override
    public List<ReservationDto> findReservationList(HttpServletRequest request) {

        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);
        //HTTP 헤더에 있는 유저이메일에서 ID를 추출 하는 로직

        List<Reservation> reservationList = reservationMapper.findReservationByMemberId(memberId);

        if (reservationList.isEmpty()) {
            throw new CustomException(ErrorCode.RESERVATIONS_NOT_FOUND);
        }
        //DB에서 유저와 일치하는 정보 reservationList에 저장

        List<ReservationDto> reservationDtoList = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            reservationDtoList.add(new ReservationDto(reservation));
        }
        //reservationList에서 필요한정보만 필터링 해서 reservationDtoList에 저장

        return reservationDtoList;
    }

    //예약 하기
    @Override
    public ReservationReqDto createReservation(HttpServletRequest request, ReservationReqDto reservationReqDto) {

        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);
        //HTTP 헤더에 있는 유저이메일에서 memberId를 추출 하는 로직

        reservationReqDto.setMemberId(memberId);
        reservationMapper.saveReservation(reservationReqDto);

        return reservationReqDto;
    }
    
    //예약 삭제
    public void deleteReservation(Long id) {
        reservationMapper.deleteById(id);
    }

    //ADMIN 예약자 출력
    @Override
    public List<AdminDto> findReservationUserList(HttpServletRequest request) {

        String adminEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long carcenterId = reservationMapper.findIdByEmail(adminEmail);

        List<AdminDto> adminDtos=reservationMapper.findReservationBycarcenter(carcenterId);

        return adminDtos;
    }
}
