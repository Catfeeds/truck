package com.hyhl.gotosea.core.ref.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyhl.common.exception.BaseBusinessError;
import com.hyhl.common.exception.BaseBusinessException;
import com.hyhl.gotosea.core.common.redis.RedisService;
import com.hyhl.gotosea.core.common.service.impl.BaseServiceImpl;
import com.hyhl.gotosea.core.ref.mapper.DictionaryMapper;
import com.hyhl.gotosea.core.ref.po.Dictionary;
import com.hyhl.gotosea.core.ref.service.DictionaryService;
import com.hyhl.gotosea.core.ref.util.RefHelper;
import com.hyhl.gotosea.core.ref.vo.DictionaryVo;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
* 
* @author Leslie.Lam
* @create 2017-07-25 14:12
**/
@Service
@Transactional(transactionManager = "refTransationManager",readOnly = true)
public class DictionaryServiceImpl extends BaseServiceImpl<Dictionary> implements DictionaryService {

    @Resource
    private DictionaryMapper dictionaryMapper;

    @Resource
    private RedisService redisService;

    private final static ObjectMapper objectMapper=new ObjectMapper();

    @Override
    @Transactional(transactionManager = "refTransationManager")
    public void addDictionary(DictionaryVo param) {
        String name = param.getName();
        if(!name.matches("^[a-zA-Z][a-zA-Z_]+[a-zA-Z]$"))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"顶级类名必须为字母或下划线，并以字母开头和结尾");
        Integer parentCode = param.getParentCode();
        if(null==parentCode)parentCode=-1;
        if(parentCode<-1) throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"parentCode不能小于-1");
        Dictionary dictionary = new Dictionary();
        if(parentCode==-1){
            if(null!=selectOne(new Dictionary(name)))throw new BaseBusinessException(BaseBusinessError.PARAMETER_ERROR.getCode(),"name已被占用");
            dictionary.setName(name);
            dictionary.setCode(0);
        }else {
            Dictionary one = selectOne(new Dictionary(name+(parentCode==0?"":"-"+parentCode)));
            if(null==one)throw new BaseBusinessException(BaseBusinessError.NOT_FOUND.getCode(),"父级不存在");
            one.setIsParent(1);
            updateByPrimaryKey(one);
            int maxCode = dictionaryMapper.getMaxCode(name);
            dictionary.setName(name+"-"+(maxCode+1));
            dictionary.setCode(maxCode+1);
        }
        dictionary.setParentCode(parentCode);
        dictionary.setIsParent(0);
        dictionary.setRemark(param.getRemark());
        insert(dictionary);
    }

    @Override
    public List<Dictionary> listDictionary(String name) {
        Example example = new Example(Dictionary.class);
        Example.Criteria criteria = example.createCriteria();
        if(StringUtils.isNotBlank(name)){
            if(name.contains("-")){
                int i = name.lastIndexOf("-");
                criteria.andCondition("name like",name.substring(0, i)+"%");
                criteria.andCondition("parent_code=",Integer.valueOf(name.substring(i+1)));
            }else {
                criteria.andCondition("name like",name+"%");
                criteria.andCondition("parent_code=0");
            }
        }else {
            criteria.andCondition("parent_code=-1");
        }
        return selectByExample(example);
    }

    @Override
    @Transactional(transactionManager = "refTransationManager")
    public void updateDictionary(Integer id,String remark) {
        Dictionary dictionary = selectByPrimaryKey(id);
        if(null==dictionary)throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
        dictionary.setRemark(remark);
        updateByPrimaryKey(dictionary);
    }

    @Override
    @Transactional(transactionManager = "refTransationManager")
    public void delDictionary(Integer id) {
        Dictionary dictionary = selectByPrimaryKey(id);
        if(null==dictionary)throw new BaseBusinessException(BaseBusinessError.NOT_FOUND);
        Integer isParent = dictionary.getIsParent();
        if(1==isParent)throw new BaseBusinessException(BaseBusinessError.FORBIDDEN);
        String name = new String(dictionary.getName());
        if(name.contains("-")){
            int i = name.lastIndexOf("-");
            name=name.substring(0, i);
        }
        Integer parentCode = dictionary.getParentCode();
        List<DictionaryVo> children = dictionaryMapper.findChildren(name, parentCode);
        if(null!=children&&children.size()==1){
            Dictionary parent = selectOne(new Dictionary(name + (parentCode==0?"":"-"+parentCode)));
            if(null!=parent){
            	parent.setIsParent(0);
                updateByPrimaryKey(parent);
            }
        }
        deleteByPrimaryKey(id);
    }

    @Override
    public List<DictionaryVo> selectAllWithChildren() {
        List<DictionaryVo> vos=null;
        List<Dictionary> dictionaries = select(new Dictionary(-1));//查询所有顶级数据字典
        if(Objects.nonNull(dictionaries)&& !dictionaries.isEmpty()){
            DictionaryVo vo;
            vos =new ArrayList<>();
            for (Dictionary dictionary:dictionaries ){
                vo=new DictionaryVo();
                BeanUtils.copyProperties(dictionary,vo);
                vo.setChilds(findChildren(vo.getName(),vo));
                vos.add(vo);
            }
        }
        return vos;
    }

    private List<DictionaryVo> findChildren(String name,DictionaryVo vo) {
        List<DictionaryVo> list=null;
        if (vo.getIsParent()==1){
            list = dictionaryMapper.findChildren(name,vo.getCode());
            if(Objects.nonNull(list)&& !list.isEmpty()){
                for (DictionaryVo d:list ){
                    d.setChilds(findChildren(name,d));
                }
            }
        }
        return list;
    }

    @Override
    public DictionaryVo selectChildrenByName(String name) throws Exception {
        DictionaryVo vo=null;
        String s = redisService.get(RefHelper.DIRECTORY + name);
        if(Objects.isNull(s)){
            Dictionary dictionary = dictionaryMapper.selectOne(new Dictionary(name));
            if(Objects.nonNull(dictionary)){
                vo=new DictionaryVo();
                BeanUtils.copyProperties(dictionary,vo);
                vo.setChilds(findChildren(name,vo));
            }
        }else {
            vo=objectMapper.readValue(s,DictionaryVo.class);
        }
        return vo;
    }

    @Override
    public String getRemarkByNameAndCode(String name, Integer code) throws Exception {
        String remark=null;
        String json = redisService.get(RefHelper.DIRECTORY + name);
        if(Objects.isNull(json)){
            Dictionary dictionary = dictionaryMapper.selectOne(new Dictionary(name+((null==code||code==0)?"":"-"+code)));
            if(Objects.nonNull(dictionary)) remark=dictionary.getRemark();
        }else {
            DictionaryVo dictionaryVo = objectMapper.readValue(json, DictionaryVo.class);
            if(Objects.nonNull(dictionaryVo)){
                if(null==code||code==0||Objects.equals(code,dictionaryVo.getCode())){
                    remark=dictionaryVo.getRemark();
                }else {
                    remark=findChildRemark(dictionaryVo,code);
                }
            }
        }
        return remark;
    }

    private String findChildRemark(DictionaryVo dictionaryVo,Integer code){
        String remark=null;
        if(dictionaryVo.getIsParent()==1){
            List<DictionaryVo> childs = dictionaryVo.getChilds();
            if(Objects.nonNull(childs)&& !childs.isEmpty()){
                for (DictionaryVo vo:childs){
                    if(Objects.equals(code,vo.getCode())){
                        remark=vo.getRemark();
                        break;
                    }else {
                        remark=findChildRemark(vo,code);
                    }
                }
            }
        }
        return remark;
    }
}
