package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.CarcenterService;
import kosa.afnica.backend.db.mapper.CarcenterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarcenterServiceImpl implements CarcenterService {

    private final CarcenterMapper carcenterMapper;

}
