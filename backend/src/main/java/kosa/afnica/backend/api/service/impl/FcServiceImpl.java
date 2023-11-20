package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.FcService;
import kosa.afnica.backend.db.dto.reservation.FcDto;
import kosa.afnica.backend.db.mapper.FcMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class FcServiceImpl implements FcService {

    private final FcMapper fcMapper;

    public void createFc(FcDto fcDto) {
        fcMapper.saveFc(fcDto);
    }
}
