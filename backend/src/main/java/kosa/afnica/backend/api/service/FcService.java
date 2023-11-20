package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.reservation.FcDto;

import javax.servlet.http.HttpServletRequest;

public interface FcService {
    void createFc(HttpServletRequest request, FcDto fcDto);

}

