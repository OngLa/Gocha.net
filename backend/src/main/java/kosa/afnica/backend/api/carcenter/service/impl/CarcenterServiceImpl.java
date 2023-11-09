package kosa.afnica.backend.api.carcenter.service.impl;

import kosa.afnica.backend.api.carcenter.service.CarcenterService;
import kosa.afnica.backend.db.mapper.CarcenterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarcenterServiceImpl implements CarcenterService {

    private final CarcenterMapper carcenterMapper;

}
