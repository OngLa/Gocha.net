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
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ReservationMapper reservationMapper;

    //예약 출력
    @Override
    public List<ReservationResDto> readReservationList(HttpServletRequest request) {
        //HTTP 헤더에 있는 유저이메일에서 ID를 추출 하는 로직
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);

        List<ReservationResDto> reservationList = reservationMapper.findReservationByMemberId(memberId);
        if(reservationList.isEmpty()) {
            throw new CustomException(ErrorCode.RESERVATIONS_NOT_FOUND);
        }

        return reservationList;
    }

    @Override
    public void createReservation(HttpServletRequest request, ReservationReqDto reservationReqDto) {
        //예약하기
        //HTTP 헤더에 있는 유저이메일에서 memberId를 추출 하는 로직
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));
        Long memberId = reservationMapper.findIdByEmail(userEmail);

        reservationReqDto.setMemberId(memberId);
        reservationMapper.saveReservation(reservationReqDto);
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
