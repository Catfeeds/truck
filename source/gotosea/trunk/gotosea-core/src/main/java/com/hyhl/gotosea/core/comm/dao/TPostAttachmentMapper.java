package com.hyhl.gotosea.core.comm.dao;

import com.hyhl.gotosea.core.comm.dto.PostAttachmentDto;
import com.hyhl.gotosea.core.comm.po.AttachmentCond;
import com.hyhl.gotosea.core.comm.po.TPostAttachment;
import com.hyhl.gotosea.core.common.mapper.MyMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TPostAttachmentMapper extends MyMapper<TPostAttachment> {
    public void insertPostAtchs(@Param("postAtchs")List<PostAttachmentDto> postAtchs);
    public List<TPostAttachment> listAtchByCond(AttachmentCond cond);

}