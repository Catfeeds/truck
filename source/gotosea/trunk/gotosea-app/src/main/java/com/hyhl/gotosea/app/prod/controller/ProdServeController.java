package com.hyhl.gotosea.app.prod.controller;

import com.hyhl.common.annotation.Login;
import com.hyhl.common.web.WebResponse;
import com.hyhl.gotosea.app.local.service.AreaService;
import com.hyhl.gotosea.app.prod.service.ProdService;
import com.hyhl.gotosea.core.common.page.Pager;
import com.hyhl.gotosea.core.cust.enm.CustFavoriteEnum;
import com.hyhl.gotosea.core.cust.po.CustFavorite;
import com.hyhl.gotosea.core.cust.service.ICustFavoriteServiceCore;
import com.hyhl.gotosea.core.order.service.OrderService;
import com.hyhl.gotosea.core.prod.dto.AppSelectServe;
import com.hyhl.gotosea.core.prod.util.ProdHelper;
import com.hyhl.gotosea.core.prod.vo.AppServesList;
import com.hyhl.gotosea.core.prod.vo.CharterDetail;
import com.hyhl.gotosea.core.prod.vo.IslandDetail;
import com.hyhl.gotosea.session.BaseSessionUser;
import com.hyhl.gotosea.session.util.AppContextHelper;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 
 * @author Leslie.Lam
 * @create 2017-07-28 18:12
 **/
@Controller
@RequestMapping("rest/prod")
public class ProdServeController {

	@Resource
	private ProdHelper prodHelper;

	@Resource
	private ProdService prodService;

	@Resource
	private AreaService areaService;

	@Resource
	private ICustFavoriteServiceCore iCustFavoriteServiceCore;

	@Resource
	private OrderService orderService;

	/**
	 * 获取服务类型
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "serveType",method = RequestMethod.GET)
	public WebResponse getServeType() throws Exception {
		return new WebResponse(prodHelper.getServeType());
	}

	/**
	 * 获取商家资源类型
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "resoType",method = RequestMethod.GET)
	public WebResponse getMerchantResourceType() throws Exception {
		return new WebResponse(prodHelper.getMerchantResourceType());
	}

    /**
     * 分页查询主题服务列表
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "theme/serves/{themeId}",method = RequestMethod.GET)
    public WebResponse selectServesByTheme(@PathVariable("themeId") Integer id){
        return new WebResponse(prodService.selectServesByTheme(id));
    }

	/**
	 * 分页查询服务列表
	 * @param param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "serves",method = RequestMethod.GET)
	public WebResponse selectServesByPage(AppSelectServe param){
		Integer[] city = param.getCity();
		if (null!=city&&city.length>0){
			List<Integer> list = areaService.selectAreaIdsByPAreaId(city);
			if(null!=list&&list.size()>0){
				param.setAreaStr(StringUtils.join(list,","));
			}
		}
		return new WebResponse(prodService.selectServesByPage(param));
	}

    /**
     * 查询个人收藏列表
     * @return
     * @throws Exception
     */
    @Login
	@ResponseBody
	@RequestMapping(value = "favorite/serves",method = RequestMethod.GET)
	public WebResponse selectPerFavoriteServesByPage() throws Exception {
        Pager<AppServesList> pager=null;
        List<String> ids = iCustFavoriteServiceCore.findFavoritesByType(AppContextHelper.getCurrentUser().getId(), CustFavoriteEnum.服务.code());
        if (null!=ids&&ids.size()>0){
            AppSelectServe param = new AppSelectServe();
            param.setIds(ids.stream().map(e->Integer.valueOf(e)).collect(Collectors.toList()));
            pager = prodService.selectServesByPage(param);
        }
        return new WebResponse(pager);
	}

	/**
	 * 查询海岛游详情
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "island/{serveId}",method = RequestMethod.GET)
	public WebResponse getRouteDetail(@PathVariable("serveId") Integer id) throws Exception {
		IslandDetail detail = prodService.getIslandDetail(id);
		if(null!=detail){
			BaseSessionUser user = AppContextHelper.getCurrentUser();
			if(null!=user)detail.setFlag(null!=iCustFavoriteServiceCore.selectOne(new CustFavorite(user.getId(),id.toString(), CustFavoriteEnum.服务.code())));
			detail.setServeInfos(prodService.getServeDetailItemContents(id));
		}
		return new WebResponse(detail);
	}

	/**
	 * 查询租船详情
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "charter/{serveId}",method = RequestMethod.GET)
	public WebResponse getCharterDetail(@PathVariable("serveId") Integer id) throws Exception {
		CharterDetail detail = prodService.getCharterDetail(id);
		if(null!=detail){
			BaseSessionUser user = AppContextHelper.getCurrentUser();
			if(null!=user)detail.setFlag(null!=iCustFavoriteServiceCore.selectOne(new CustFavorite(user.getId(),id.toString(), CustFavoriteEnum.服务.code())));
			detail.setServeInfos(prodService.getServeDetailItemContents(id));
			detail.setDiscuss(orderService.selectServeEvaluates(detail.getId()));
		}
		return new WebResponse(detail);
	}

	/**
	 * 查询服务详情选项卡获取html片段	
	 * @param serveId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "serve/{serveId}/items",method = RequestMethod.GET)
	public String getServeDetailItems(@PathVariable("serveId") Integer serveId,Model model) throws Exception {
		model.addAttribute("items",prodService.getServeInfo(serveId));
		return "serve_item";
	}


	/**
	 * 查询销售计划
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sales/{serveId}",method = RequestMethod.GET)
	public WebResponse getSalesPlan(@PathVariable("serveId") Integer id) throws Exception {
		return new WebResponse(prodService.selectSalePlans(id));
	}

	/**
	 * 查询服务某一天价格
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sale/{serveId}/{time}",method = RequestMethod.GET)
	public WebResponse getPriceByIdAndTime(@PathVariable("serveId") Integer id,@PathVariable("time") String time) throws Exception {
		Assert.notNull(id,"id不能为空");
		Assert.notNull(time,"日期不能为空");
		return new WebResponse(prodService.getPriceByIdAndTime(id,time));
	}

	/**
	 * 列举目的地
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "dest/list")
	public WebResponse listDestination(){
		return prodService.listDestination();
	}


	/**
	 * 查询租船服务钓点
	 */
	@ResponseBody
	@RequestMapping(value = "charter/point/{serveId}",method = RequestMethod.GET)
	public WebResponse selectServeFishingPoint(@PathVariable("serveId") Integer id){
		return new WebResponse(prodService.selectServeFishingPoint(id));
	}
}
