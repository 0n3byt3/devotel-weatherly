//external dependencies
import { toast as reactToast } from 'react-toastify';
//external types dependencies
//internal dependencies
//internal types dependencies

type ToastContent = string | string[];

function ToastList({ list }: {list: string[]}) { 
    return(
        <div className="flex flex-col text-sm gap-2">
            {
                list.map((v, i) => (<span key={i} className="w-full">{v}</span>))
            }
        </div>
    );
}

function validatContent(content: ToastContent) {
    let cntntComp: JSX.Element; 
    if (Array.isArray(content)) {
        cntntComp = <ToastList list={content} />;
    }
    else {
        cntntComp = (
            <span className="flex text-sm ">
                { content }
            </span>
        );
    }
    return cntntComp;
}

const toast = (content: ToastContent, op = {}) => {
    return reactToast(validatContent(content), op);
};

toast.err = (content: ToastContent, op = {}) => { 
    return reactToast.error(validatContent(content), op);
};

toast.permErr = (content: ToastContent, op = {}) => { 
    return reactToast.error(validatContent(content), {...op, autoClose: false});
};

toast.suc = (content: ToastContent, op = {}) => { 
    return reactToast.success(validatContent(content), op);
};

toast.update = (id: number | string, op: {render: ToastContent} = {render: ''}) => { 
    return reactToast.update(id, {...op, render: validatContent(op.render)});
};

export { toast };